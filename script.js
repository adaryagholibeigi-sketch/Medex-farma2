// ========== MedEx — Main Engine ==========
(function() {
    'use strict';

    const D = window.MEDEX_DATA || {};
    const TOPICS = D.TOPICS || [];
    const LESSON_SUMMARY = D.LESSON_SUMMARY || {};
    const NIGHT_SUMMARY = D.NIGHT_SUMMARY || {};
    const GOLDEN_NOTES = D.GOLDEN_NOTES || {};
    const SAMPLE_QUESTIONS = D.SAMPLE_QUESTIONS || [];
    const AUTHORED_QUESTIONS = D.AUTHORED_QUESTIONS || [];

    const topicLabels = {};
    TOPICS.forEach(t => { topicLabels[t.id] = t.label; });

    const bankState = { answers: {} };
    const authoredState = { answers: {} };
    const examState = {
        questions: [], current: 0, answers: {}, marked: {},
        timer: null, elapsed: 0, limit: 0, active: false
    };

    function $(s, r = document) { return r.querySelector(s); }
    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    function esc(str) {
        return String(str).replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    }
    function fmtTime(sec) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    const views = ['home','summary','night','golden','bank','authored','exam'];
    function showView(name) {
        views.forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) el.classList.toggle('active', v === name);
        });
        document.querySelectorAll('.nav-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.view === name));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.addEventListener('click', e => {
        const target = e.target.closest('[data-view]');
        if (!target) return;
        e.preventDefault();
        showView(target.dataset.view);
    });

    function renderTopicTabs(tabsId, contentId, dataMap) {
        const tabsEl = document.getElementById(tabsId);
        const contentEl = document.getElementById(contentId);
        if (!tabsEl || !contentEl) return;
        const available = TOPICS.filter(t => dataMap[t.id]);
        if (!available.length) {
            contentEl.innerHTML = '<div class="empty-msg">محتوایی وجود ندارد.</div>';
            return;
        }
        let active = available[0].id;
        function render() {
            tabsEl.innerHTML = available.map(t =>
                `<button class="topic-tab ${t.id===active?'active':''}" data-topic="${t.id}">${t.label}</button>`
            ).join('');
            contentEl.innerHTML = dataMap[active];
        }
        tabsEl.addEventListener('click', e => {
            const b = e.target.closest('.topic-tab');
            if (!b) return;
            active = b.dataset.topic;
            render();
        });
        render();
    }

    function fillTopicSelect(sel) {
        if (!sel) return;
        sel.innerHTML = '<option value="all">همه</option>' +
            TOPICS.map(t => `<option value="${t.id}">${t.label}</option>`).join('');
    }

    function renderQCard(q, idx, state, stateName) {
        const st = state.answers[q.id];
        const answered = !!st;
        const correct = st && st.correct;
        const cardClass = answered ? (correct ? 'correct' : 'wrong') : '';
        const diffLabel = q.difficulty === 'easy' ? 'آسان' :
                         q.difficulty === 'medium' ? 'متوسط' : 'سخت';

        let feedbackHtml = '';
        if (answered) {
            feedbackHtml = `
                <div class="feedback show ${correct?'correct':'wrong'}">
                    <strong>${correct?'✅ پاسخ صحیح است':'❌ پاسخ نادرست است'}</strong>
                    <p>${esc(q.explanation||'')}</p>
                    <button class="change-answer" data-change="${q.id}" data-state="${stateName}">تغییر پاسخ</button>
                </div>`;
        }

        const optsHtml = q.options.map((opt, i) => {
            let cls = 'option';
            if (answered) {
                if (i === q.correct) cls += ' correct';
                else if (i === st.selected) cls += ' wrong';
            }
            return `<div class="${cls}" data-qid="${q.id}" data-index="${i}" data-state="${stateName}">
                <span class="indicator">${String.fromCharCode(1575+i)}</span>
                <span>${esc(opt)}</span>
            </div>`;
        }).join('');

        return `<div class="q-card ${cardClass}">
            <div class="q-header">
                <span class="q-number">سؤال ${idx+1}</span>
                <div class="q-badges">
                    <span class="badge topic">${topicLabels[q.topic]||q.topic}</span>
                    <span class="badge ${q.difficulty}">${diffLabel}</span>
                </div>
            </div>
            <div class="q-text">${esc(q.question)}</div>
            <div class="options">${optsHtml}</div>
            ${feedbackHtml}
        </div>`;
    }

    function renderBank() {
        const listEl = document.getElementById('bank-list');
        const counterEl = document.getElementById('bank-counter');
        if (!listEl) return;
        const topicF = document.getElementById('bank-topic')?.value || 'all';
        const diffF = document.getElementById('bank-difficulty')?.value || 'all';
        const statusF = document.getElementById('bank-status')?.value || 'all';

        let items = SAMPLE_QUESTIONS.slice();
        if (topicF !== 'all') items = items.filter(q => q.topic === topicF);
        if (diffF !== 'all') items = items.filter(q => q.difficulty === diffF);
        if (statusF !== 'all') {
            items = items.filter(q => {
                const st = bankState.answers[q.id];
                if (statusF === 'unanswered') return !st;
                if (statusF === 'correct') return st && st.correct;
                if (statusF === 'wrong') return st && !st.correct;
                return true;
            });
        }
        if (!items.length) {
            listEl.innerHTML = '<div class="empty-msg">هیچ سؤالی با این فیلترها یافت نشد.</div>';
            if (counterEl) counterEl.textContent = '';
            return;
        }
        listEl.innerHTML = items.map((q,i) => renderQCard(q,i,bankState,'bank')).join('');
        if (counterEl) counterEl.textContent = `${items.length} سؤال`;
    }

    function renderAuthored() {
        const listEl = document.getElementById('authored-list');
        const counterEl = document.getElementById('authored-counter');
        if (!listEl) return;
        const topicF = document.getElementById('authored-topic')?.value || 'all';
        const diffF = document.getElementById('authored-difficulty')?.value || 'all';

        let items = AUTHORED_QUESTIONS.slice();
        if (topicF !== 'all') items = items.filter(q => q.topic === topicF);
        if (diffF !== 'all') items = items.filter(q => q.difficulty === diffF);

        if (!items.length) {
            listEl.innerHTML = '<div class="empty-msg">هیچ سؤالی با این فیلترها یافت نشد.</div>';
            if (counterEl) counterEl.textContent = '';
            return;
        }
        listEl.innerHTML = items.map((q,i) => renderQCard(q,i,authoredState,'authored')).join('');
        if (counterEl) counterEl.textContent = `${items.length} سؤال`;
    }

    document.addEventListener('click', e => {
        const optEl = e.target.closest('.option[data-qid]');
        if (optEl) {
            const qid = parseInt(optEl.dataset.qid);
            const idx = parseInt(optEl.dataset.index);
            const stName = optEl.dataset.state;
            const state = stName === 'bank' ? bankState : authoredState;
            const pool = stName === 'bank' ? SAMPLE_QUESTIONS : AUTHORED_QUESTIONS;
            if (state.answers[qid]) return;
            const q = pool.find(x => x.id === qid);
            if (!q) return;
            state.answers[qid] = { selected: idx, correct: idx === q.correct };
            stName === 'bank' ? renderBank() : renderAuthored();
            return;
        }
        const changeEl = e.target.closest('[data-change]');
        if (changeEl) {
            const qid = parseInt(changeEl.dataset.change);
            const stName = changeEl.dataset.state;
            const state = stName === 'bank' ? bankState : authoredState;
            delete state.answers[qid];
            stName === 'bank' ? renderBank() : renderAuthored();
            return;
        }
        if (e.target.closest('#bank-reset')) { bankState.answers = {}; renderBank(); }
        if (e.target.closest('#authored-reset')) { authoredState.answers = {}; renderAuthored(); }
    });

    ['bank-topic','bank-difficulty','bank-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', renderBank);
    });
    ['authored-topic','authored-difficulty'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', renderAuthored);
    });

    function setupExam() {
        const topic = document.getElementById('cfg-topic').value;
        const diff = document.getElementById('cfg-difficulty').value;
        const source = document.getElementById('cfg-source').value;
        const count = document.getElementById('cfg-count').value;
        const timer = parseInt(document.getElementById('cfg-timer').value);
        const msg = document.getElementById('setup-msg');

        let pool = [];
        if (source === 'sample') pool = SAMPLE_QUESTIONS.slice();
        else if (source === 'authored') pool = AUTHORED_QUESTIONS.slice();
        else pool = [...SAMPLE_QUESTIONS, ...AUTHORED_QUESTIONS];

        if (topic !== 'all') pool = pool.filter(q => q.topic === topic);
        if (diff !== 'all') pool = pool.filter(q => q.difficulty === diff);

        if (!pool.length) {
            msg.textContent = 'هیچ سؤالی با این فیلترها یافت نشد.';
            return;
        }

        let selected;
        if (count === 'all') selected = shuffle(pool);
        else {
            const n = Math.min(parseInt(count), pool.length);
            if (n < parseInt(count)) msg.textContent = `توجه: فقط ${n} سؤال موجود بود.`;
            else msg.textContent = '';
            selected = shuffle(pool).slice(0, n);
        }

        examState.questions = selected.map(q => ({
            ...q,
            shuffledOptions: shuffle(q.options.map((opt,i) => ({ text: opt, originalIndex: i })))
        }));
        examState.current = 0;
        examState.answers = {};
        examState.marked = {};
        examState.elapsed = 0;
        examState.limit = timer * 60;
        examState.active = true;

        document.getElementById('exam-setup').classList.add('hidden');
        document.getElementById('exam-running').classList.remove('hidden');
        document.getElementById('exam-result').classList.add('hidden');

        renderExamQuestion();
        renderExamPalette();
        startExamTimer();
    }

    function startExamTimer() {
        if (examState.timer) clearInterval(examState.timer);
        updateExamTimer();
        examState.timer = setInterval(() => {
            examState.elapsed++;
            updateExamTimer();
            if (examState.limit > 0 && examState.elapsed >= examState.limit) {
                clearInterval(examState.timer);
                finishExam(true);
            }
        }, 1000);
    }

    function updateExamTimer() {
        const el = document.getElementById('exam-timer');
        if (!el) return;
        let secLeft = examState.limit > 0 ? Math.max(0, examState.limit - examState.elapsed) : examState.elapsed;
        el.textContent = fmtTime(secLeft);
        el.classList.remove('warning','danger');
        if (examState.limit > 0) {
            if (secLeft < 60) el.classList.add('danger');
            else if (secLeft < 180) el.classList.add('warning');
        }
    }

    function renderExamQuestion() {
        const q = examState.questions[examState.current];
        if (!q) return;
        const area = document.getElementById('exam-question-area');
        const diffLabel = q.difficulty === 'easy' ? 'آسان' :
                         q.difficulty === 'medium' ? 'متوسط' : 'سخت';
        const selected = examState.answers[q.id];
        const isMarked = examState.marked[q.id];

        const optsHtml = q.shuffledOptions.map((opt, i) => {
            const isSel = selected === opt.originalIndex;
            return `<div class="option ${isSel?'selected':''}" data-exam-opt="${opt.originalIndex}">
                <span class="indicator">${String.fromCharCode(1575+i)}</span>
                <span>${esc(opt.text)}</span>
            </div>`;
        }).join('');

        area.innerHTML = `<div class="q-card">
            <div class="q-header">
                <span class="q-number">سؤال ${examState.current+1} از ${examState.questions.length}</span>
                <div class="q-badges">
                    <span class="badge topic">${topicLabels[q.topic]||q.topic}</span>
                    <span class="badge ${q.difficulty}">${diffLabel}</span>
                </div>
            </div>
            <div class="q-text">${esc(q.question)}</div>
            <div class="options">${optsHtml}</div>
        </div>`;

        const markBtn = document.getElementById('exam-mark');
        if (markBtn) markBtn.textContent = isMarked ? 'حذف علامت' : 'علامت‌گذاری';

        const total = examState.questions.length;
        document.getElementById('exam-progress').textContent = `سؤال ${examState.current+1} از ${total}`;
        document.getElementById('exam-progress-fill').style.width = ((examState.current+1)/total*100) + '%';
        document.getElementById('exam-prev').disabled = examState.current === 0;
        document.getElementById('exam-next').disabled = examState.current === total - 1;
    }

    function renderExamPalette() {
        const pal = document.getElementById('exam-palette');
        if (!pal) return;
        pal.innerHTML = examState.questions.map((q, i) => {
            const cls = ['palette-item'];
            if (examState.answers[q.id] !== undefined) cls.push('answered');
            if (examState.marked[q.id]) cls.push('marked');
            if (i === examState.current) cls.push('current');
            return `<button class="${cls.join(' ')}" data-palette="${i}">${i+1}</button>`;
        }).join('');
    }

    function finishExam(auto) {
        if (!auto) {
            const unans = examState.questions.filter(q => examState.answers[q.id] === undefined).length;
            const msg = unans > 0 ? `شما ${unans} سؤال بی‌پاسخ دارید. مطمئن هستید؟` : 'آزمون را پایان می‌دهید؟';
            if (!confirm(msg)) return;
        }
        examState.active = false;
        if (examState.timer) clearInterval(examState.timer);
        document.getElementById('exam-running').classList.add('hidden');
        document.getElementById('exam-result').classList.remove('hidden');
        renderExamResult();
    }

    function renderExamResult() {
        let correct = 0, wrong = 0, unanswered = 0;
        const topicStats = {};
        const diffStats = { easy:{c:0,t:0}, medium:{c:0,t:0}, hard:{c:0,t:0} };

        examState.questions.forEach(q => {
            const ans = examState.answers[q.id];
            const ok = ans === q.correct;
            if (ans === undefined) unanswered++;
            else if (ok) correct++;
            else wrong++;
            if (!topicStats[q.topic]) topicStats[q.topic] = { c:0, t:0 };
            topicStats[q.topic].t++;
            if (ok) topicStats[q.topic].c++;
            if (diffStats[q.difficulty]) {
                diffStats[q.difficulty].t++;
                if (ok) diffStats[q.difficulty].c++;
            }
        });

        const total = examState.questions.length;
        const percent = total ? Math.round(correct/total*100) : 0;
        const score = total ? ((correct/total)*20).toFixed(2) : '0';

        document.getElementById('r-correct').textContent = correct;
        document.getElementById('r-wrong').textContent = wrong;
        document.getElementById('r-unanswered').textContent = unanswered;
        document.getElementById('r-percent').textContent = percent + '٪';
        document.getElementById('r-score').textContent = score;
        document.getElementById('r-time').textContent = fmtTime(examState.elapsed);

        const tHtml = Object.keys(topicStats).map(t => {
            const s = topicStats[t];
            const p = Math.round(s.c/s.t*100);
            const cls = p >= 70 ? 'good' : p >= 40 ? 'medium' : 'bad';
            return `<div class="analysis-bar">
                <span class="label">${topicLabels[t]||t}</span>
                <div class="track"><div class="fill ${cls}" style="width:${p}%">${p}٪ (${s.c}/${s.t})</div></div>
            </div>`;
        }).join('');
        document.getElementById('r-analysis-topic').innerHTML = tHtml || '<p>داده‌ای نیست.</p>';

        const dHtml = ['easy','medium','hard'].map(d => {
            const s = diffStats[d];
            if (!s.t) return '';
            const p = Math.round(s.c/s.t*100);
            const cls = p >= 70 ? 'good' : p >= 40 ? 'medium' : 'bad';
            const lbl = d === 'easy' ? 'آسان' : d === 'medium' ? 'متوسط' : 'سخت';
            return `<div class="analysis-bar">
                <span class="label">${lbl}</span>
                <div class="track"><div class="fill ${cls}" style="width:${p}%">${p}٪ (${s.c}/${s.t})</div></div>
            </div>`;
        }).join('');
        document.getElementById('r-analysis-diff').innerHTML = dHtml || '<p>داده‌ای نیست.</p>';

        const weak = Object.keys(topicStats).filter(t => topicStats[t].c/topicStats[t].t < 0.5)
            .map(t => topicLabels[t]||t);
        document.getElementById('r-weakness').innerHTML = weak.length
            ? `<p>مباحث نیازمند مرور:</p><ul>${weak.map(t => `<li>${t}</li>`).join('')}</ul>`
            : '<p>✅ عملکرد شما در همه مباحث مناسب است.</p>';

        const revHtml = examState.questions.map((q, i) => {
            const ans = examState.answers[q.id];
            const ok = ans === q.correct;
            const status = ans === undefined ? 'unanswered' : (ok ? 'correct' : 'wrong');
            const statusLabel = ans === undefined ? 'بی‌پاسخ' : (ok ? 'صحیح' : 'غلط');
            const userAns = ans !== undefined ? q.options[ans] : '—';
            const correctAns = q.options[q.correct];
            const diffLabel = q.difficulty === 'easy' ? 'آسان' :
                             q.difficulty === 'medium' ? 'متوسط' : 'سخت';
            return `<div class="review-q ${status}">
                <div class="rq-head">
                    <strong>سؤال ${i+1}</strong>
                    <div class="q-badges">
                        <span class="badge topic">${topicLabels[q.topic]||q.topic}</span>
                        <span class="badge ${q.difficulty}">${diffLabel}</span>
                        <span class="status-badge ${status}">${statusLabel}</span>
                    </div>
                </div>
                <div class="q-text">${esc(q.question)}</div>
                <p><strong>پاسخ شما:</strong> ${esc(userAns)}</p>
                <p><strong>پاسخ صحیح:</strong> ${esc(correctAns)}</p>
                <div class="feedback show ${ok?'correct':'wrong'}">
                    <strong>توضیح:</strong> ${esc(q.explanation||'')}
                </div>
            </div>`;
        }).join('');
        document.getElementById('r-review').innerHTML = revHtml;
    }

    function retryWrongExam() {
        const wrongQs = examState.questions.filter(q => examState.answers[q.id] !== q.correct);
        if (!wrongQs.length) { alert('هیچ سؤال غلطی ندارید!'); return; }
        examState.questions = wrongQs.map(q => ({
            ...q,
            shuffledOptions: shuffle(q.options.map((opt,i) => ({ text: opt, originalIndex: i })))
        }));
        examState.current = 0;
        examState.answers = {};
        examState.marked = {};
        examState.elapsed = 0;
        examState.limit = 0;
        examState.active = true;
        document.getElementById('exam-setup').classList.add('hidden');
        document.getElementById('exam-running').classList.remove('hidden');
        document.getElementById('exam-result').classList.add('hidden');
        renderExamQuestion();
        renderExamPalette();
        startExamTimer();
    }

    const startBtn = document.getElementById('start-exam');
    if (startBtn) startBtn.addEventListener('click', setupExam);

    const prevBtn = document.getElementById('exam-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (examState.current > 0) { examState.current--; renderExamQuestion(); renderExamPalette(); }
    });

    const nextBtn = document.getElementById('exam-next');
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (examState.current < examState.questions.length - 1) {
            examState.current++; renderExamQuestion(); renderExamPalette();
        }
    });

    const markBtn = document.getElementById('exam-mark');
    if (markBtn) markBtn.addEventListener('click', () => {
        const q = examState.questions[examState.current];
        if (!q) return;
        examState.marked[q.id] = !examState.marked[q.id];
        renderExamQuestion();
        renderExamPalette();
    });

    const finishBtn = document.getElementById('exam-finish');
    if (finishBtn) finishBtn.addEventListener('click', () => finishExam(false));

    document.addEventListener('click', e => {
        const opt = e.target.closest('[data-exam-opt]');
        if (opt && examState.active) {
            const q = examState.questions[examState.current];
            if (!q) return;
            examState.answers[q.id] = parseInt(opt.dataset.examOpt);
            renderExamQuestion();
            renderExamPalette();
        }
        const p = e.target.closest('[data-palette]');
        if (p) {
            examState.current = parseInt(p.dataset.palette);
            renderExamQuestion();
            renderExamPalette();
        }
    });

    const retryBtn = document.getElementById('retry-wrong');
    if (retryBtn) retryBtn.addEventListener('click', retryWrongExam);

    const newBtn = document.getElementById('new-exam');
    if (newBtn) newBtn.addEventListener('click', () => {
        document.getElementById('exam-setup').classList.remove('hidden');
        document.getElementById('exam-running').classList.add('hidden');
        document.getElementById('exam-result').classList.add('hidden');
        document.getElementById('setup-msg').textContent = '';
    });

    function init() {
        renderTopicTabs('summary-tabs','summary-content', LESSON_SUMMARY);
        renderTopicTabs('night-tabs','night-content', NIGHT_SUMMARY);
        renderTopicTabs('golden-tabs','golden-content', GOLDEN_NOTES);
        fillTopicSelect(document.getElementById('bank-topic'));
        fillTopicSelect(document.getElementById('authored-topic'));
        fillTopicSelect(document.getElementById('cfg-topic'));
        renderBank();
        renderAuthored();
        document.getElementById('exam-running').classList.add('hidden');
        document.getElementById('exam-result').classList.add('hidden');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
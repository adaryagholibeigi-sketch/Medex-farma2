// ============== داده‌های MedEx ==============

const TOPICS = [
    { id: 'diabetes', label: 'دیابت' },
    { id: 'thyroid', label: 'تیروئید' },
    { id: 'hypertension', label: 'فشار خون' },
    { id: 'angina', label: 'آنژین صدری' },
    { id: 'heart-failure', label: 'نارسایی قلبی' },
    { id: 'antiarrhythmic', label: 'ضد آریتمی' },
    { id: 'female-hormones', label: 'هورمون‌های زنانه' },
    { id: 'male-hormones', label: 'هورمون‌های مردانه' },
    { id: 'other', label: 'سایر' }
];

const LESSON_SUMMARY = {
    diabetes: `
        <h3>داروهای ضد دیابت شیرین</h3>
        <h4>انواع دیابت</h4>
        <table><thead><tr><th>نوع</th><th>ویژگی و درمان</th></tr></thead><tbody>
        <tr><td>تیپ I (IDDM)</td><td>انسولین در گردش خون وجود ندارد + گلوکاگون بالا. درمان: انسولین. بدون درمان: کتوز، کتواسیدوز.</td></tr>
        <tr><td>تیپ II (NIDDM)</td><td>عمدتاً بالغین؛ انسولین کمتر از معمول. در چاق‌ها انسولین بالاتر از نرمال است اما حساسیت بافتی کم است.</td></tr>
        <tr><td>تیپ III</td><td>پانکراتیت، داروها.</td></tr>
        <tr><td>تیپ IV (بارداری)</td><td>۷٪ زنان باردار آمریکا؛ نوزادان وزن بالاتر دارند.</td></tr>
        </tbody></table>
        <h4>انسولین</h4>
        <p>پروانسولین به انسولین و C-peptide تبدیل می‌شود. C-peptide بی‌اثر ولی شاخص ترشح. گیرنده تیروزین پروتئین کیناز؛ تجزیه در کبد و کلیه.</p>
        <table><thead><tr><th>دسته</th><th>داروها</th><th>ویژگی</th></tr></thead><tbody>
        <tr><td>سریع‌اثر</td><td>Aspart, Lispro, Glulisine</td><td>۳-۵ ساعت؛ وریدی در DKA.</td></tr>
        <tr><td>کوتاه‌اثر</td><td>Regular</td><td>وریدی و زیرجلدی.</td></tr>
        <tr><td>متوسط‌اثر</td><td>NPH</td><td>۱۸-۲۴ ساعت؛ ۱-۲ بار در روز.</td></tr>
        <tr><td>طولانی‌اثر</td><td>Detemir, Glargine</td><td>۲۴-۳۶ ساعت.</td></tr>
        <tr><td>طولانی‌اثر</td><td>Degludec</td><td>بیش از ۴۲ ساعت؛ در ایران نیست.</td></tr>
        </tbody></table>
        <div class="alert alert-danger"><strong>باکس تله:</strong> انسولین انسانی = هایپرتروفی چربی؛ انسولین حیوانی = آتروفی.</div>
        <h4>داروهای خوراکی</h4>
        <table><thead><tr><th>دارو</th><th>مکانیسم</th><th>عارضه کلیدی</th></tr></thead><tbody>
        <tr><td>سولفونیل‌اوره / رپاگلینید</td><td>آزادسازی انسولین</td><td>هیپوگلیسمی</td></tr>
        <tr><td>متفورمین</td><td>AMPK، کاهش تولید گلوکز کبدی</td><td>اسیدوز لاکتیک، کاهش B12</td></tr>
        <tr><td>پیوگلیتازون</td><td>افزایش حساسیت به انسولین</td><td>افزایش وزن، CHF</td></tr>
        <tr><td>آکاربوز</td><td>مهار آلفاگلوکوزیداز</td><td>نفخ و درد شکمی</td></tr>
        <tr><td>SGLT2 inhibitor</td><td>گلوکاوری</td><td>عفونت ژنیتال</td></tr>
        <tr><td>GLP-1 agonist</td><td>انسولین↑، گلوکاگون↓</td><td>تهوع، پانکراتیت</td></tr>
        <tr><td>DPP-4 inhibitor</td><td>حفظ GLP-1</td><td>پانکراتیت نادر</td></tr>
        </tbody></table>`,
    thyroid: `<h3>داروهای مؤثر بر تیروئید</h3>
        <p>هورمون‌ها: T4 (غیرفعال) و T3 (فعال). مراحل سنتز: Trapping (مهار با SCN- و ClO4-)، پراکسیداز (تیوآمیدها)، آلی شدن، Coupling، پروتئولیز (یدورها).</p>
        <h4>درمان کم‌کاری: لووتیروکسین</h4>
        <p>داروی انتخابی؛ ثبات غلظت ۶-۸ هفته؛ شیرخوار ۲-۸ µg/kg، بالغ ۱.۷ µg/kg. مسمومیت = علائم پرکاری.</p>
        <h4>درمان پرکاری</h4>
        <table><thead><tr><th>دارو</th><th>مکانیسم</th><th>نکته</th></tr></thead><tbody>
        <tr><td>PTU</td><td>مهار پراکسیداز</td><td>ارجح در بارداری؛ هپاتیت شدید</td></tr>
        <tr><td>متی‌مازول</td><td>مهار پراکسیداز</td><td>آگرانولوسیتوز؛ Aplasia Cutis</td></tr>
        <tr><td>یدورها (SSKI)</td><td>وقفه آلی شدن</td><td>قبل از جراحی</td></tr>
        <tr><td>I-131</td><td>تخریب پارانشیم</td><td>کم‌کاری ۸۰٪</td></tr>
        </tbody></table>
        <div class="alert alert-danger"><strong>باکس تله:</strong> کاهش خطر استروک با نیمودیپین؛ CCB برای CRF کاربرد ندارد.</div>`,
    hypertension: `<h3>داروهای ضد فشار خون</h3>
        <h4>دیورتیک‌ها</h4>
        <table><thead><tr><th>گروه</th><th>محل</th><th>عوارض</th></tr></thead><tbody>
        <tr><td>تیازیدها</td><td>لوله دیستال</td><td>GTT+، هیپرگلیسمی</td></tr>
        <tr><td>فوروسمید</td><td>قوس هنله</td><td>سمیت شنوایی، هیپوکالمی</td></tr>
        <tr><td>ذخیره‌کننده K</td><td>لوله</td><td>هیپرکالمی، اسیدوز</td></tr>
        </tbody></table>
        <p>انتخاب: کلیه سالم = تیازید؛ نارسا (GFR<۳۰) = فوروسمید.</p>
        <h4>سمپاتولیتیک‌ها</h4>
        <p>کلونیدین: ترک الکل/سیگار، قطع ناگهانی ← فوریت. متیل‌دوپا: کومبز مثبت کاذب.</p>
        <h4>وازودیلاتورها</h4>
        <p>هیدرالازین (لوپوس‌مانند)، مینوکسیدیل (پرمویی)، نیتروپروسید (سیانور)، دیازوکسید (هیپرگلیسمی).</p>
        <h4>ACEI/ARB</h4>
        <p>ACEI: سرفه، هیپرکالمی، ARF در تنگی شریان کلیه. ARB: سرفه کم.</p>`,
    angina: `<h3>داروهای آنژین صدری</h3>
        <h4>انواع</h4>
        <p>Effort (پایدار)، Variant (اسپاسم کرونر)، ناپایدار (ACS).</p>
        <h4>نیترات‌ها</h4>
        <p>اتساع ورید (preload↓). عوارض: هیپوتانسیون وضعی، تاکی‌کاردی رفلکسی، سردرد کوبنده، منع در ICP↑.</p>
        <h4>CCB</h4>
        <p>وراپامیل/دیلتیازم (قلبی)؛ نیفدیپین (عروقی)؛ نیمودیپین (مغزی). بلوک AV، برادی‌کاردی، CHF.</p>
        <h4>بتابلوکرها</h4>
        <p>β1 (آنتولول، متوپرولول) vs β1+β2 (پروپرانولول ← آسم).</p>`,
    'heart-failure': `<h3>نارسایی احتقانی قلب (CHF)</h3>
        <h4>دیگوکسین</h4>
        <p>مهار Na+/K+-ATPase ← Na↑ و Ca↑ ← انقباض↑؛ تحریک واگ. عوارض: استفراغ، آریتمی (PVC). نیمه عمر ۴۰ ساعت.</p>
        <h4>درمان مسمومیت</h4>
        <p>خفیف: قطع + K خوراکی. شدید: K + لیدوکائین/فنی‌توئین. بسیار شدید: Digoxin immune Fab.</p>
        <h4>الکترولیت</h4>
        <p>هیپوکالمی ← سمیت↑. هیپرکالمی ← اثر↓.</p>
        <h4>مراحل درمان</h4>
        <p>A ← تعدیل عوامل؛ B ← β-blocker + ACEI/ARB؛ C ← spironolactone؛ D ← LVAD/Transplant.</p>`,
    antiarrhythmic: `<h3>داروهای ضد آریتمی</h3>
        <table><thead><tr><th>گروه</th><th>داروها</th></tr></thead><tbody>
        <tr><td>A (سدیم)</td><td>لیدوکائین، کینیدین، پروکائین‌آمید، فلکائینید</td></tr>
        <tr><td>B (بتا)</td><td>پروپرانولول، سوتالول، اسمولول</td></tr>
        <tr><td>C (پتاسیم)</td><td>آمیودارون، دروندارون</td></tr>
        <tr><td>D (کلسیم)</td><td>وراپامیل، دیلتیازم</td></tr>
        <tr><td>E (متفرقه)</td><td>آدنوزین</td></tr>
        </tbody></table>
        <h4>تله‌ها</h4>
        <p>ANA = پروکائین‌آمید؛ سنکوئیسم = کینیدین. لیدوکائین: کمترین سمیت، انتخاب اول CCU.</p>`,
    'female-hormones': `<h3>هورمون‌های جنسی زنانه</h3>
        <h4>استروژن</h4>
        <p>طبیعی: استرادیول. صناعی: Ethinyl estradiol، Mestranol، DES، Premarin.</p>
        <p>عوارض: خونریزی یائسگی، ماسک حاملگی، میگرن، سنگ صفراوی، سرطان اندومتر.</p>
        <h4>پروژستین</h4>
        <p>HDL↓، BP↑، تراکم استخوان↓. شبه‌آندروژن‌ها → پرمویی و وزن↑.</p>
        <h4>OCP ترکیبی</h4>
        <p>رنین↑، تیروکسین↑، پرولاکتین↑ اما شیر↓، GTT+. کلوآسما (استروژنی)، آکنه/وزن (پروژسترونی).</p>
        <h4>DMPA</h4>
        <p>آمنوره، تأخیر تخمک‌گذاری ۱۸ ماه. مناسب پرمویی + دیسمنوره + اندومتریوز در دختران بالای ۳۵ سال.</p>`,
    'male-hormones': `<h3>هورمون‌های جنسی مردانه</h3>
        <h4>محور بیضه</h4>
        <p>FSH ← گامتوژنیک؛ LH ← تستوسترون از سلول‌های لیدیگ. ۵-آلفا-ردوکتاز: تستوسترون ← DHT.</p>
        <table><thead><tr><th>دارو</th><th>مکانیسم</th></tr></thead><tbody>
        <tr><td>فیناسترید</td><td>مهار ۵-آلفا-ردوکتاز</td></tr>
        <tr><td>اسپیرونولاکتون</td><td>رقابت با DHT</td></tr>
        <tr><td>کتوکونازول</td><td>مهار سنتز آندروژن</td></tr>
        </tbody></table>
        <h4>عوارض آنابولیک</h4>
        <p>در مردان: آزوسپرمی، ژنیکوماستی. در زنان: پرمویی، آکنه، کلفت شدن صدا.</p>
        <h4>گوسیپول</h4>
        <p>تخریب لوله‌های منی‌ساز؛ هیپوکالمی؛ چین.</p>`,
    other: `<h3>سایر مباحث</h3>
        <h4>گلوکاگون</h4>
        <p>هیپوگلیسمی شدید، مسمومیت با بتابلوکر؛ تشخیص فئوکروموسیتوما و کارسینوم مدولر تیروئید.</p>
        <h4>استاتین‌ها</h4>
        <p>میوپاتی و درد عضلانی؛ افزایش آنزیم‌های کبدی.</p>
        <h4>کلستیرامین</h4>
        <p>اتصال به اسیدهای صفراوی.</p>
        <h4>بی‌فسفونات‌ها</h4>
        <p>تحریک مری و معده؛ زولدرونات: سالی یک بار.</p>`
};

const NIGHT_SUMMARY = {
    diabetes: `<h3>شب امتحان — دیابت</h3><ul>
        <li>انسولین: آنابولیک؛ گیرنده تیروزین کیناز؛ C-peptide بی‌اثر.</li>
        <li>انسولین انسانی = هایپرتروفی؛ حیوانی = آتروفی.</li>
        <li>متفورمین: کاهش وزن، اسیدوز لاکتیک، کاهش B12.</li>
        <li>پیوگلیتازون: افزایش وزن، CHF.</li>
        <li>آکاربوز: نفخ، کاهش HbA1c.</li>
        <li>SGLT2: گلوکاوری، عفونت ژنیتال.</li>
        <li>GLP-1: تهوع ۴۴٪، پانکراتیت.</li>
        <li>گلوکاگون: هیپوگلیسمی شدید، مسمومیت با بتابلوکر.</li>
    </ul>`,
    thyroid: `<h3>شب امتحان — تیروئید</h3><ul>
        <li>تیوآمیدها: مهار پراکسیداز؛ راش؛ آگرانولوسیتوز.</li>
        <li>PTU: هپاتیت کشنده، ارجح در بارداری.</li>
        <li>متی‌مازول: Aplasia Cutis.</li>
        <li>SSKI: قبل از جراحی.</li>
        <li>I-131: کم‌کاری ۸۰٪.</li>
        <li>لووتیروکسین: مسمومیت = علائم پرکاری.</li>
    </ul>`,
    hypertension: `<h3>شب امتحان — فشار خون</h3><ul>
        <li>فوروسمید: نارسایی کلیه، سمیت شنوایی.</li>
        <li>تیازید: GTT+، هیپرگلیسمی.</li>
        <li>کلونیدین: ترک الکل/سیگار.</li>
        <li>متیل‌دوپا: کومبز مثبت کاذب.</li>
        <li>هیدرالازین: لوپوس‌مانند.</li>
        <li>نیتروپروسید: سیانور.</li>
        <li>ACEI: سرفه، هیپرکالمی، منع در حاملگی.</li>
    </ul>`,
    angina: `<h3>شب امتحان — آنژین</h3><ul>
        <li>نیترات: هیپوتانسیون وضعی + سردرد کوبنده.</li>
        <li>CCB: بلوک AV، CHF، یبوست.</li>
        <li>بتابلوکر: β1 vs β1+β2.</li>
        <li>آدنوزین: آریتمی AV نودال.</li>
    </ul>`,
    'heart-failure': `<h3>شب امتحان — نارسایی قلبی</h3><ul>
        <li>دیگوکسین: مهار Na/K ATPase. مسمومیت: PVC، تهوع.</li>
        <li>درمان: قطع، K، لیدوکائین، Fab.</li>
        <li>هیپوکالمی ← سمیت↑.</li>
        <li>مراحل: A، B، C، D.</li>
    </ul>`,
    antiarrhythmic: `<h3>شب امتحان — ضد آریتمی</h3><ul>
        <li>لیدوکائین: انتخاب اول CCU.</li>
        <li>آمیودارون: فیبروز ریه، تیروئید.</li>
        <li>کینیدین: سنکوئیسم.</li>
        <li>پروکائین‌آمید: لوپوس‌مانند.</li>
        <li>آدنوزین: گرگرفتگی، هیپوتانسیون.</li>
    </ul>`,
    'female-hormones': `<h3>شب امتحان — هورمون‌های زنانه</h3><ul>
        <li>استروژن: خونریزی یائسگی، کلوآسما، سرطان اندومتر.</li>
        <li>پروژستین: HDL↓، BP↑.</li>
        <li>OCP: رنین↑ ← فشار خون↑.</li>
        <li>DMPA: آمنوره، تأخیر ۱۸ ماه.</li>
    </ul>`,
    'male-hormones': `<h3>شب امتحان — هورمون‌های مردانه</h3><ul>
        <li>فیناسترید: ۵-آلفا-ردوکتاز.</li>
        <li>اسپیرونولاکتون: رقابت با DHT.</li>
        <li>گوسیپول: تخریب لوله‌های منی‌ساز، هیپوکالمی.</li>
        <li>آنابولیک: آزوسپرمی، ژنیکوماستی.</li>
    </ul>`,
    other: `<h3>شب امتحان — سایر</h3><ul>
        <li>گلوکاگون: هیپوگلیسمی، مسمومیت با بتابلوکر.</li>
        <li>استاتین: میوپاتی.</li>
        <li>کلستیرامین: اتصال به اسیدهای صفراوی.</li>
        <li>بی‌فسفونات: تحریک مری.</li>
    </ul>`
};

const GOLDEN_NOTES = {
    diabetes: `<h3>نکات طلایی — دیابت</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> کاهش وزن = متفورمین؛ افزایش وزن = پیوگلیتازون.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> اسیدوز لاکتیک و کاهش B12 = متفورمین؛ CHF = پیوگلیتازون.</div>
        <div class="alert alert-danger"><strong>تله ۳:</strong> در دیابت II فقط GLP-1 مؤثر است، GIP بی‌اثر.</div>`,
    thyroid: `<h3>نکات طلایی — تیروئید</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> PTU ارجح در بارداری؛ Aplasia Cutis = متی‌مازول.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> هپاتیت = PTU؛ آگرانولوسیتوز = متی‌مازول.</div>
        <div class="alert alert-danger"><strong>تله ۳:</strong> مسمومیت لووتیروکسین = علائم پرکاری.</div>`,
    hypertension: `<h3>نکات طلایی — فشار خون</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> کلونیدین آگونیست آلفا ۲ است، نه مهارکننده.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> وقفه انزال = رزرپین و گوانتیدین.</div>
        <div class="alert alert-warning"><strong>تله ۳:</strong> کومبز مثبت کاذب = متیل‌دوپا.</div>
        <div class="alert alert-danger"><strong>تله ۴:</strong> ARF در تنگی = ACEI.</div>`,
    angina: `<h3>نکات طلایی — آنژین</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> بلوک AV عارضه CCB، نه نیترات.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> میگرن = باور قدیمی CCB.</div>
        <div class="alert alert-warning"><strong>تله ۳:</strong> Monday disease = کارگران نیترات.</div>`,
    'heart-failure': `<h3>نکات طلایی — نارسایی قلبی</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> CTZ در دیگوکسین تحریک می‌شود.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> هیپوکالمی ← سمیت دیژیتال↑.</div>
        <div class="alert alert-danger"><strong>تله ۳:</strong> استفراغ = نشانه مسمومیت.</div>`,
    antiarrhythmic: `<h3>نکات طلایی — ضد آریتمی</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> ANA = پروکائین‌آمید؛ سنکوئیسم = کینیدین.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> لیدوکائین: کمترین سمیت، تشنج ← دیازپام.</div>
        <div class="alert alert-danger"><strong>تله ۳:</strong> فلکائینید در سابقه سکته ممنوع.</div>`,
    'female-hormones': `<h3>نکات طلایی — هورمون‌های زنانه</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> گرگرفتگی اندیکاسیون استروژن، نه عارضه.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> کلوآسما = استروژنی؛ آکنه = پروژسترونی.</div>
        <div class="alert alert-warning"><strong>تله ۳:</strong> OCP فشار خون را بالا می‌برد.</div>`,
    'male-hormones': `<h3>نکات طلایی — هورمون‌های مردانه</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> فیناسترید = مهار آنزیم.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> آنابولیک: ↓HDL، ↑کرونر.</div>
        <div class="alert alert-warning"><strong>تله ۳:</strong> گوسیپول: تخریب لوله‌های منی‌ساز، هیپوکالمی.</div>`,
    other: `<h3>نکات طلایی — سایر</h3>
        <div class="alert alert-warning"><strong>تله ۱:</strong> گلوکاگون در مسمومیت با بتابلوکر.</div>
        <div class="alert alert-warning"><strong>تله ۲:</strong> کلستیرامین: اتصال به اسیدهای صفراوی.</div>
        <div class="alert alert-warning"><strong>تله ۳:</strong> بی‌فسفونات: تحریک مری.</div>`
};

// ۶۱ سؤال نمونه — کاملاً بازنویسی‌شده
const SAMPLE_QUESTIONS = [
    {id:1,topic:'female-hormones',difficulty:'medium',question:'بیمار دختری ۲۸ ساله و مجرد که دچار پرمویی است و در معاینه بالینی مشخص شده که دچار اندومتریوز و دیسمنوره می‌باشد. مصرف کدام دارو توصیه می‌شود؟',options:['مدروکسی پروژسترون استات (DMPA)','اتینیل استرادیول + سیپروترون (قرص دیان)','اتینیل استرادیول + لونوروژسترول (قرص HD)','سرترالین + دی اتیل استیل بسترول'],correct:1,explanation:'قرص دیان (سیپروترون کمپاند) برای پرمویی درمان اختصاصی است و قرص‌های ترکیبی دیسمنوره را بهبود می‌دهند.'},
    {id:2,topic:'male-hormones',difficulty:'easy',question:'کدام اثر در مصرف درازمدت آندروژن/آنابولیک در مردان دیده می‌شود؟',options:['کاهش HDL و هپاتومگالی','کاهش LDL و احساس خوب بودن','بهبود خلق و کاهش پرخاشگری','افزایش وزن ناشی از تجمع چربی شکمی'],correct:0,explanation:'آندروژن‌ها HDL را کم و آنزیم کبدی را زیاد می‌کنند و می‌توانند هپاتومگالی و آدنوم کبدی ایجاد کنند.'},
    {id:3,topic:'diabetes',difficulty:'medium',question:'مصرف مهارکننده DPP-4 مثل سیتاگلیپتین کدام اثر را ایجاد می‌کند؟',options:['سمیت خونی','نارسایی احتقانی قلب','افزایش انسولین در گردش خون','کاهش جذب نشاسته'],correct:2,explanation:'سیتاگلیپتین با مهار DPP4 از تجزیه GLP-1 جلوگیری می‌کند و آزادسازی انسولین را بالا می‌برد.'},
    {id:4,topic:'diabetes',difficulty:'medium',question:'بیمار دیابت نوع ۱ تحت درمان با ۱۰ واحد رگولار و ۲۰ واحد NPH، کدام اثر قابل بروز است؟',options:['اسیدوز لاکتیک','آتروفی چربی','افزایش ذخیره گلیکوژن کبد','عفونت کاندیدیاز'],correct:2,explanation:'انسولین آنابولیک است و ذخیره گلیکوژن کبد را زیاد می‌کند.'},
    {id:5,topic:'hypertension',difficulty:'medium',question:'مکانیسم اثر کدام دارو غلط است؟',options:['دیازوکسید: اتساع عروق','کلونیدین: مهار آلفا ۲ مغزی','انالاپریل: مهار ACE','والسارتان: مهار AT1'],correct:1,explanation:'کلونیدین گیرنده آلفا ۲ را تحریک می‌کند نه مهار.'},
    {id:6,topic:'other',difficulty:'medium',question:'عارضه طولانی‌مدت آتورواستاتین؟',options:['نکروز کبدی','میوپاتی و درد عضلانی','سنگ صفراوی','کبودی پوست'],correct:1,explanation:'مهم‌ترین عارضه استاتین‌ها میوپاتی است.'},
    {id:7,topic:'female-hormones',difficulty:'easy',question:'دارو مناسب برای DUB؟',options:['ترانگزامیک اسید','پریمارین','سیپروترون','میفپریستون'],correct:0,explanation:'در DUB امروزه ترانگزامیک اسید و NSAID تجویز می‌شود.'},
    {id:8,topic:'angina',difficulty:'medium',question:'CCB مثل نیفدیپین کدام اثر را دارد؟',options:['پیشگیری از میگرن','جلوگیری از ARF','درمان سندروم نفروتیک','کاهش خطر خونریزی زیر عنکبوتیه'],correct:3,explanation:'CCB (نیمودیپین) خطر خونریزی زیر عنکبوتیه را کم می‌کند.'},
    {id:9,topic:'male-hormones',difficulty:'medium',question:'فیناسترید چطور سرطان پروستات را بهبود می‌دهد؟',options:['جلوگیری از تولید آندروژن','مهار گیرنده آندروژنی','مهار DNA','مهار تبدیل تستوسترون به DHT'],correct:3,explanation:'فیناسترید ۵-آلفا-ردوکتاز را مهار می‌کند.'},
    {id:10,topic:'thyroid',difficulty:'medium',question:'تیوآمیدها همه اثرات زیر را دارند به جز:',options:['انهدام پارانشیم','وقفه MIT/DIT','وقفه پراکسیداز','کاهش پروتئولیز'],correct:0,explanation:'انهدام پارانشیم کار ید رادیواکتیو است.'},
    {id:11,topic:'thyroid',difficulty:'medium',question:'کدام عبارت صحیح است؟',options:['متی‌مازول جذب ید را کم می‌کند','SSKI درمان کم‌کاری نوزاد','I-131 تاکی‌کاردی','PTU راش ماکولوپاپولار'],correct:3,explanation:'راش ماکولوپاپولار عارضه معمول تیوآمیدهاست.'},
    {id:12,topic:'female-hormones',difficulty:'medium',question:'عارضه پروژستین در مصرف ۲ ساله؟',options:['کلوآسما','سردرد میگرنی','کاهش HDL','سرطان اندومتر'],correct:2,explanation:'پروژستین HDL را کم می‌کند.'},
    {id:13,topic:'heart-failure',difficulty:'medium',question:'دیگوکسین چطور فیبریلاسیون دهلیزی را درمان می‌کند؟',options:['ضدپلاکتی','کاهش انقباض','مهار Na/K ATPase','تحریک واگ'],correct:3,explanation:'دیگوکسین با تحریک واگ سرعت AV را کم می‌کند.'},
    {id:14,topic:'hypertension',difficulty:'medium',question:'خانم ۳۵ ساله باردار با فشار ۱۰۰ دیاستول؛ کدام دارو؟',options:['لوزارتان','دیازوکسید','کاپتوپریل','متیل‌دوپا'],correct:3,explanation:'در حاملگی متیل‌دوپا و هیدرالازین استفاده می‌شود.'},
    {id:15,topic:'female-hormones',difficulty:'medium',question:'اثر OCP ترکیبی؟',options:['افزایش ترشح شیر','افزایش پرولاکتین و کورتیزول','درد مفصلی','اتساع شریان'],correct:1,explanation:'OCP پرولاکتین و کورتیزول را افزایش می‌دهد.'},
    {id:16,topic:'female-hormones',difficulty:'medium',question:'همه عوارض OCP به جز:',options:['سنگ صفراوی','کلوآسما','دیابت','کاهش فشار خون'],correct:3,explanation:'OCP فشار خون را بالا می‌برد، نه کاهش.'},
    {id:17,topic:'other',difficulty:'medium',question:'اثر کلستیرامین؟',options:['اتساع عروق','کاهش جذب TG','افزایش تبدیل کلسترول به اسید صفراوی','GTT+'],correct:2,explanation:'کلستیرامین با اتصال به اسیدهای صفراوی دفع را زیاد و تبدیل کلسترول را افزایش می‌دهد.'},
    {id:18,topic:'angina',difficulty:'medium',question:'وراپامیل کدام اثر؟',options:['بلوک AV','نارسایی کلیه','افزایش آنزیم کبدی','سیانوز'],correct:0,explanation:'CCB با کاهش هدایت گره AV بلوک می‌دهد.'},
    {id:19,topic:'antiarrhythmic',difficulty:'medium',question:'داروی انتخابی برای فیبریلاسیون پس از MI؟',options:['آمیودارون','وراپامیل','لیدوکائین','پروپافنون'],correct:2,explanation:'لیدوکائین تزریقی انتخاب اول CCU است.'},
    {id:20,topic:'male-hormones',difficulty:'medium',question:'ناندرولون در بدنسازان کدام اثر؟',options:['نارسایی کلیوی','کاهش فاکتور انعقادی','سرطان پستان','آزوسپرمی و ژنیکوماستی'],correct:3,explanation:'آنابولیک‌ها آزوسپرمی و ژنیکوماستی ایجاد می‌کنند.'},
    {id:21,topic:'male-hormones',difficulty:'medium',question:'گوسیپول چطور باروری را کم می‌کند؟',options:['کاهش FSH/LH','کاهش تستوسترون','تخریب لوله‌های منی‌ساز','جلوگیری از تستوسترون'],correct:2,explanation:'گوسیپول لوله‌های منی‌ساز را تخریب می‌کند.'},
    {id:22,topic:'antiarrhythmic',difficulty:'medium',question:'همه عوارض آمیودارون به جز:',options:['رسوب قرنیه','فیبروز ریوی','اختلال تیروئید','افزایش ANA'],correct:3,explanation:'افزایش ANA مربوط به پروکائین‌آمید است.'},
    {id:23,topic:'antiarrhythmic',difficulty:'medium',question:'آدنوزین کدام اثر؟',options:['سنکونیسم','کاهش هدایت AV','لوپوس','مهار Ca/K'],correct:1,explanation:'آدنوزین هدایت گره AV را کم می‌کند.'},
    {id:24,topic:'female-hormones',difficulty:'medium',question:'پریمارین در یائسگی کدام عارضه؟',options:['آرامش','افزایش MI','گرگرفتگی','خونریزی واژینال'],correct:3,explanation:'خونریزی واژینال عارضه مهم استروژن در یائسگی است.'},
    {id:25,topic:'diabetes',difficulty:'medium',question:'اثر پیوگلیتازون؟',options:['کاهش خطر کرونر','کاهش گلوکز کبدی','کاهش وزن','سرطان پستان'],correct:0,explanation:'پیوگلیتازون خطر کرونر را کم می‌کند.'},
    {id:26,topic:'hypertension',difficulty:'medium',question:'کدام دارو میل به الکل و مخدر را کم می‌کند؟',options:['کلونیدین','انالاپریل','پروپرانولول','متیل‌دوپا'],correct:0,explanation:'کلونیدین میل به سیگار، الکل و مخدر را کم می‌کند.'},
    {id:27,topic:'hypertension',difficulty:'hard',question:'بیمار با کراتینین ۳ mg/dL؛ کدام دیورتیک؟',options:['فوروسمید','تریامترن','اسپیرونولاکتون','هیدروکلروتیازید'],correct:0,explanation:'در نارسایی کلیه فوروسمید انتخاب می‌شود.'},
    {id:28,topic:'thyroid',difficulty:'medium',question:'علائم مسمومیت لووتیروکسین در بالغین؟',options:['برادی‌کاردی','لرزش و ضعف','لاغری، لرزش، عصبانیت','تاکی‌پنه'],correct:2,explanation:'مسمومیت = علائم پرکاری.'},
    {id:29,topic:'heart-failure',difficulty:'medium',question:'اثر دیگوکسین؟',options:['افزایش آنزیم کبدی','کاهش اثر Ca','تحریک CTZ','افزایش Na داخل و Ca داخل'],correct:3,explanation:'دیگوکسین Na و Ca داخل سلول را افزایش می‌دهد.'},
    {id:30,topic:'angina',difficulty:'easy',question:'عارضه نیتروگلیسیرین؟',options:['نارسایی کلیه','خونریزی مغزی','هیپوتانسیون وضعی و سردرد','بلوک AV'],correct:2,explanation:'هیپوتانسیون وضعی و سردرد کوبنده عوارض نیترات است.'},
    {id:31,topic:'other',difficulty:'medium',question:'TCA در کدام کاربرد؟',options:['درد مزمن','قبل از جراحی','کاهش اشتها','آریتمی'],correct:0,explanation:'TCA در دردهای مزمن کاربرد دارد.'},
    {id:32,topic:'other',difficulty:'medium',question:'کدام عارضه صحیح است؟',options:['فلپامات کاهش وزن','توپیرامات افزایش اشتها','اتوسوکسیمید نیستاگموس','مالمالوتریزن درماتیت'],correct:2,explanation:'اتوسوکسیمید نیستاگموس می‌دهد.'},
    {id:33,topic:'other',difficulty:'medium',question:'کدام دارو کلسترول را به اسید صفراوی تبدیل می‌کند؟',options:['کلستیرامین','آتورواستاتین','نیاسین','جمفیروزیل'],correct:0,explanation:'کلستیرامین تبدیل کلسترول به اسید صفراوی را افزایش می‌دهد.'},
    {id:34,topic:'female-hormones',difficulty:'medium',question:'مناسب‌ترین دارو برای تعویق سیکل در عقب‌افتادگی ذهنی؟',options:['DMPA','قرص HD','پریمارین','تاموکسیفن'],correct:0,explanation:'DMPA (پروژسترون تنها) مناسب است.'},
    {id:35,topic:'angina',difficulty:'medium',question:'کدام اثر نیترات؟',options:['کاهش ICP','نارسایی کلیه','تاکی‌کاردی ناشی از هیپوتانسیون','بلوک AV'],correct:2,explanation:'افت فشار ← فعال‌شدن سمپاتیک ← تاکی‌کاردی.'},
    {id:36,topic:'angina',difficulty:'medium',question:'ایوابرادین کدام است؟',options:['کاهش ریتم بدون اثر انقباض','اختلال شنوایی','خاصیت بتا بلوکر','کاهش فشار خون پیران'],correct:0,explanation:'Ivabradine سرعت SA را کم می‌کند بدون اثر بر انقباض.'},
    {id:37,topic:'female-hormones',difficulty:'medium',question:'عارضه پروژستین ۲ ساله؟',options:['سردرد میگرنی','کاهش HDL','کلوآسما','سرطان آندومتر'],correct:1,explanation:'HDL↓ از عوارض پروژستین‌هاست.'},
    {id:38,topic:'male-hormones',difficulty:'medium',question:'ناندرولون کدام عارضه؟',options:['افزایش خطر کرونر','سرطان پستان','نارسایی کلیه','ترومبوز وریدی'],correct:0,explanation:'آنابولیک‌ها با کاهش HDL خطر کرونر را افزایش می‌دهند.'},
    {id:39,topic:'thyroid',difficulty:'medium',question:'دوز بالای لووتیروکسین کدام؟',options:['سیانوز','راش ماکولوپاپولار','برادی‌کاردی','بی‌خوابی و بی‌قراری'],correct:3,explanation:'بی‌خوابی و بی‌قراری علائم مسمومیت لووتیروکسین است.'},
    {id:40,topic:'diabetes',difficulty:'medium',question:'اثر انسولین خالص انسانی؟',options:['اسیدوز لاکتیک','افزایش گلیکوژن و TG','عفونت کاندیدیاز','آتروفی چربی'],correct:1,explanation:'انسولین آنابولیک، گلیکوژن و TG را زیاد می‌کند.'},
    {id:41,topic:'angina',difficulty:'medium',question:'CCB برای همه موارد به جز:',options:['آریتمی','خونریزی زیر عنکبوتیه','CRF','آنژین'],correct:2,explanation:'CCB برای CRF کاربرد ندارد.'},
    {id:42,topic:'angina',difficulty:'medium',question:'کدام دارو در پیران CHF ایجاد می‌کند؟',options:['کلونیدین','نیتروگلیسیرین','لوسارتان','وراپامیل'],correct:3,explanation:'وراپامیل با کاهش انقباض، CHF ایجاد می‌کند.'},
    {id:43,topic:'thyroid',difficulty:'medium',question:'شایع‌ترین عارضه I-131؟',options:['نئوپلازی','کم‌کاری','پرکاری','سرطان'],correct:1,explanation:'کم‌کاری تیروئید در ۸۰٪ بیماران.'},
    {id:44,topic:'hypertension',difficulty:'medium',question:'داروی فشار خون در بارداری؟',options:['متیل‌دوپا','لوزارتان','کاپتوپریل','دیازوکسید'],correct:0,explanation:'متیل‌دوپا و هیدرالازین در بارداری.'},
    {id:45,topic:'female-hormones',difficulty:'medium',question:'همه عوارض OCP به جز:',options:['یرقان کلستاتیک','سنگ صفراوی','GTT+','تشدید زخم معده'],correct:3,explanation:'OCP علائم زخم معده را کاهش می‌دهد.'},
    {id:46,topic:'hypertension',difficulty:'medium',question:'داروی حاملگی با هیپرتانسیون مزمن؟',options:['متیل‌دوپا','لوزارتان','کاپتوپریل','دیازوکسید'],correct:0,explanation:'متیل‌دوپا در حاملگی ارجح است.'},
    {id:47,topic:'antiarrhythmic',difficulty:'medium',question:'همه عوارض آمیودارون به جز:',options:['کاهش هدایت AV','فیبروز ریه','کاهش انقباض','افزایش ANA'],correct:3,explanation:'ANA از پروکائین‌آمید است.'},
    {id:48,topic:'antiarrhythmic',difficulty:'medium',question:'آدنوزین کدام اثر؟',options:['لوپوس','مهار Ca/K','سنکونیسم','کاهش هدایت AV'],correct:3,explanation:'آدنوزین هدایت AV را کم می‌کند.'},
    {id:49,topic:'female-hormones',difficulty:'medium',question:'OCP کدام عارضه؟',options:['ترومبوز وریدی','کاهش فشار دیاستول','افزایش شیر','درد مفصلی'],correct:0,explanation:'OCP خطر ترومبوز وریدی را ۳-۷ برابر می‌کند.'},
    {id:50,topic:'thyroid',difficulty:'medium',question:'متی‌مازول در بارداری کدام عارضه؟',options:['میکسدم','برادی‌کاردی','Aplasia Cutis','نئوپلازی'],correct:2,explanation:'Aplasia Cutis از متی‌مازول است.'},
    {id:51,topic:'male-hormones',difficulty:'medium',question:'آنابولیک در مردان کدام؟',options:['چربی شکمی','هپاتومگالی و سرطان کبد','کاهش LDL','بهبود خلق'],correct:1,explanation:'آنابولیک‌ها هپاتومگالی و سرطان کبد می‌دهند.'},
    {id:52,topic:'other',difficulty:'medium',question:'آتورواستاتین کدام عارضه؟',options:['سنگ صفراوی','گرگرفتگی','نکروز کبدی','افزایش آنزیم کبدی'],correct:3,explanation:'افزایش آنزیم کبدی از عوارض استاتین است.'},
    {id:53,topic:'diabetes',difficulty:'medium',question:'آکاربوز کدام اثر؟',options:['اسیدوز لاکتیک','کاهش کرونر','افزایش انسولین','کاهش HbA1c'],correct:3,explanation:'آکاربوز HbA1c را کاهش می‌دهد.'},
    {id:54,topic:'heart-failure',difficulty:'medium',question:'دیگوکسین چطور فیبریلاسیون دهلیزی را درمان می‌کند؟',options:['تحریک واگ','کاهش Na','کاهش انقباض','ضدپلاکتی'],correct:0,explanation:'تحریک واگ سرعت AV را کم می‌کند.'},
    {id:55,topic:'heart-failure',difficulty:'medium',question:'مسمومیت دیگوکسین؟',options:['الیگوری','شلی عضلات','افزایش آنزیم کبد','آریتمی شدید'],correct:3,explanation:'آریتمی شدید در مسمومیت دیگوکسین رخ می‌دهد.'},
    {id:56,topic:'female-hormones',difficulty:'medium',question:'پریمارین در یائسگی؟',options:['گرگرفتگی','کاهش کورتیزول','خونریزی واژینال','آرامش'],correct:2,explanation:'خونریزی واژینال عارضه استروژن است.'},
    {id:57,topic:'diabetes',difficulty:'medium',question:'لیبراگلوتید کدام؟',options:['CHF','افزایش انسولین','کاهش جذب نشاسته','کاهش جذب چربی'],correct:1,explanation:'GLP-1 انسولین را زیاد می‌کند.'},
    {id:58,topic:'hypertension',difficulty:'medium',question:'کدام دیورتیک GTT+ می‌دهد؟',options:['هیدروکلروتیازید','اسپیرونولاکتون','فوروسمید','کاپتوپریل'],correct:0,explanation:'تیازید GTT+ می‌دهد.'},
    {id:59,topic:'hypertension',difficulty:'medium',question:'کدام دارو کومبز مثبت کاذب؟',options:['پروپرانولول','متیل‌دوپا','کاپتوپریل','پرازوسین'],correct:1,explanation:'متیل‌دوپا کومبز مثبت کاذب می‌دهد.'},
    {id:60,topic:'female-hormones',difficulty:'medium',question:'میفپریستون کدام؟',options:['درمان سرطان','سقط ۶ هفته اول','کاهش LH/FSH','مهار تستوسترون'],correct:1,explanation:'میفپریستون ضدپروژسترونی است و سقط می‌دهد.'},
    {id:61,topic:'female-hormones',difficulty:'medium',question:'داروی اختلال خلق PMS؟',options:['ایبوپروفن','سرترالین و فلوکستین','ترانگزامیک اسید','پریمارین'],correct:1,explanation:'SSRI برای PMS-خلق تجویز می‌شود.'}
];

const AUTHORED_QUESTIONS = (typeof window.AUTHORED_QUESTIONS_FROM_BANK !== 'undefined' && window.AUTHORED_QUESTIONS_FROM_BANK)
    ? window.AUTHORED_QUESTIONS_FROM_BANK
    : [];

window.MEDEX_DATA = {
    TOPICS,
    LESSON_SUMMARY,
    NIGHT_SUMMARY,
    GOLDEN_NOTES,
    SAMPLE_QUESTIONS,
    AUTHORED_QUESTIONS
};
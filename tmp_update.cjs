const fs = require('fs');
let code = fs.readFileSync('resources/js/pages/therapists.tsx', 'utf8');

// Add Schedule type
code = code.replace(
    /type Therapist = \{/,
    `type Schedule = {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
};

type Therapist = {`
);
code = code.replace(
    /is_online: boolean;\n\};/,
    `is_online: boolean;
    schedules?: Schedule[];
};`
);

// Remove static mock data
code = code.replace(/const days = \['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'\];\n\nconst week1 = \[[\s\S]*?\];\n\nconst week2 = \[[\s\S]*?\];\n\nconst morningSlots = \[[\s\S]*?\];\n\nconst afternoonSlots = \[[\s\S]*?\];\n/g, '');

// State in Therapists
code = code.replace(
    /const \[selectedDate, setSelectedDate\] = useState\(5\);\n    const \[selectedTime, setSelectedTime\] = useState\('14:00'\);/,
    `const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);`
);

// Replace endHour and update ScheduleView call
code = code.replace(
    /    const endHour = Number\(selectedTime\.split\(':'\)\[0\]\) \+ 1;\n/,
    ``
);

code = code.replace(
    /<ScheduleView\n                    therapist=\{selectedTherapist\}\n                    selectedDate=\{selectedDate\}\n                    selectedTime=\{selectedTime\}\n                    endHour=\{endHour\}\n                    onSelectDate=\{setSelectedDate\}\n                    onSelectTime=\{setSelectedTime\}\n                \/>/,
    `<ScheduleView
                    therapist={selectedTherapist}
                    selectedDate={selectedDate}
                    selectedSchedule={selectedSchedule}
                    onSelectDate={setSelectedDate}
                    onSelectSchedule={setSelectedSchedule}
                />`
);

// Update ScheduleView signature
code = code.replace(
    /function ScheduleView\(\{\n    therapist,\n    selectedDate,\n    selectedTime,\n    endHour,\n    onSelectDate,\n    onSelectTime,\n\}: \{\n    therapist: Therapist;\n    selectedDate: number;\n    selectedTime: string;\n    endHour: number;\n    onSelectDate: \(date: number\) => void;\n    onSelectTime: \(time: string\) => void;\n\}\) \{/g,
    `// Helper for date generation
function getNext14Days(schedules?: Schedule[]) {
    if (!schedules || schedules.length === 0) return [];
    const availableDays = new Set(schedules.map((s) => s.day_of_week.toLowerCase()));
    
    const dayNamesMap: Record<number, string> = {
        0: 'minggu', 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu'
    };
    
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dayName = dayNamesMap[d.getDay()];
        dates.push({
            dateObj: d,
            dateStr: d.toISOString().split('T')[0],
            dayNum: d.getDate(),
            dayNameShort: dayName.substring(0, 3).toUpperCase(),
            disabled: !availableDays.has(dayName),
        });
    }
    return dates;
}

function ScheduleView({
    therapist,
    selectedDate,
    selectedSchedule,
    onSelectDate,
    onSelectSchedule,
}: {
    therapist: Therapist;
    selectedDate: string;
    selectedSchedule: Schedule | null;
    onSelectDate: (date: string) => void;
    onSelectSchedule: (schedule: Schedule) => void;
}) {
    const availableDates = getNext14Days(therapist.schedules);
    const availableSchedules = (therapist.schedules || []).filter(s => {
        if (!selectedDate) return false;
        const d = new Date(selectedDate);
        const dayNamesMap: Record<number, string> = {
            0: 'minggu', 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu'
        };
        return s.day_of_week.toLowerCase() === dayNamesMap[d.getDay()];
    });`
);

// Update DatePickerCard and TimePickerCard calls inside ScheduleView
code = code.replace(
    /<DatePickerCard\n                        selectedDate=\{selectedDate\}\n                        onSelectDate=\{onSelectDate\}\n                    \/>\n\n                    <TimePickerCard\n                        selectedTime=\{selectedTime\}\n                        onSelectTime=\{onSelectTime\}\n                    \/>/,
    `<DatePickerCard
                        availableDates={availableDates}
                        selectedDate={selectedDate}
                        onSelectDate={onSelectDate}
                    />

                    <TimePickerCard
                        availableSchedules={availableSchedules}
                        selectedSchedule={selectedSchedule}
                        onSelectSchedule={onSelectSchedule}
                    />`
);

// Update SummaryItem for Tanggal and Waktu
code = code.replace(
    /value=\{\`\$\{selectedDate\} Oktober 2026\`\}/,
    `value={selectedDate ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(selectedDate)) : '-'}`
);
code = code.replace(
    /value=\{\`\$\{selectedTime\} - \$\{String\(endHour\)\.padStart\(2, '0'\)\}:00 WIB\`\}/,
    `value={selectedSchedule ? \`\${selectedSchedule.start_time.substring(0,5)} - \${selectedSchedule.end_time.substring(0,5)} WIB\` : '-'}`
);

// Update Konfirmasi Pemesanan link
code = code.replace(
    /href=\{\`\/payment\?psychologist_id=\$\{therapist\.id\}\`\}/,
    `href={\`/payment?psychologist_id=\${therapist.id}\${selectedSchedule && selectedDate ? \`&schedule_id=\${selectedSchedule.id}&date=\${selectedDate}\` : ''}\`}`
);

// Disable the button if schedule and date not selected
code = code.replace(
    /className="mb-4 flex h-\[52px\] w-full cursor-pointer items-center justify-center gap-2 rounded-\[14px\] border-none bg-\[#1464BC\] text-base font-semibold text-white shadow-\[0_8px_20px_-4px_rgba\(0,93,167,0\.4\)\] transition-colors hover:bg-\[#1053A0\]"/,
    `className={\`mb-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border-none text-base font-semibold text-white shadow-[0_8px_20px_-4px_rgba(0,93,167,0.4)] transition-colors \${selectedSchedule && selectedDate ? 'bg-[#1464BC] hover:bg-[#1053A0] cursor-pointer' : 'bg-[#c1c7d3] cursor-not-allowed'}\`}
                            onClick={(e) => {
                                if (!selectedSchedule || !selectedDate) e.preventDefault();
                            }}`
);

// Update DatePickerCard signature and logic
code = code.replace(
    /function DatePickerCard\(\{\n    selectedDate,\n    onSelectDate,\n\}: \{\n    selectedDate: number;\n    onSelectDate: \(date: number\) => void;\n\}\) \{[\s\S]*?function DateRow/m,
    `function DatePickerCard({
    availableDates,
    selectedDate,
    onSelectDate,
}: {
    availableDates: any[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}) {
    const week1 = availableDates.slice(0, 7);
    const week2 = availableDates.slice(7, 14);

    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#f2f4f6] p-2 text-[#1464BC]">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <h2 className="m-0 text-lg font-black text-[#191c1e]">
                        Pilih Tanggal
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <DateRow
                    items={week1}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                />
                <DateRow
                    items={week2}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                />
            </div>
        </section>
    );
}

function DateRow`
);

// Update DateRow signature and logic
code = code.replace(
    /function DateRow\(\{\n    items,\n    selectedDate,\n    onSelectDate,\n\}: \{\n    items: Array<\{ date: number; disabled: boolean \}>;\n    selectedDate: number;\n    onSelectDate: \(date: number\) => void;\n\}\) \{[\s\S]*?function TimePickerCard/m,
    `function DateRow({
    items,
    selectedDate,
    onSelectDate,
}: {
    items: any[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}) {
    if (items.length === 0) return null;

    return (
        <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {items.map((item) => (
                <div key={item.dateStr} className="flex flex-col items-center gap-2">
                    <div className="text-[11px] font-bold tracking-widest text-[#a0a5b1]">
                        {item.dayNameShort}
                    </div>
                    <button
                        type="button"
                        disabled={item.disabled}
                        onClick={() => !item.disabled && onSelectDate(item.dateStr)}
                        className={\`flex aspect-square w-full cursor-pointer items-center justify-center rounded-[14px] border-none text-[15px] font-semibold transition-all md:aspect-auto md:h-14 \${
                            item.disabled
                                ? 'cursor-not-allowed bg-transparent text-[#c1c7d3]'
                                : selectedDate === item.dateStr
                                  ? 'bg-[#1464BC] text-white shadow-[0_8px_16px_-4px_rgba(0,93,167,0.3)]'
                                  : 'bg-[#f7f9fb] text-[#191c1e] hover:bg-[#e2e4e6]'
                        }\`}
                    >
                        {item.dayNum}
                    </button>
                </div>
            ))}
        </div>
    );
}

function TimePickerCard`
);

// Update TimePickerCard signature and logic
code = code.replace(
    /function TimePickerCard\(\{\n    selectedTime,\n    onSelectTime,\n\}: \{\n    selectedTime: string;\n    onSelectTime: \(time: string\) => void;\n\}\) \{[\s\S]*?function TimeSlotGroup/m,
    `function TimePickerCard({
    availableSchedules,
    selectedSchedule,
    onSelectSchedule,
}: {
    availableSchedules: Schedule[];
    selectedSchedule: Schedule | null;
    onSelectSchedule: (schedule: Schedule) => void;
}) {
    // Sort schedules by start_time
    const sorted = [...availableSchedules].sort((a, b) => a.start_time.localeCompare(b.start_time));
    const morningSlots = sorted.filter(s => parseInt(s.start_time.split(':')[0]) < 12);
    const afternoonSlots = sorted.filter(s => parseInt(s.start_time.split(':')[0]) >= 12);

    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-[#f2f4f6] p-2 text-[#1464BC]">
                    <Clock className="h-5 w-5" />
                </div>
                <h2 className="m-0 text-lg font-black text-[#191c1e]">
                    Jadwal Tersedia
                </h2>
            </div>

            {sorted.length === 0 && (
                <div className="text-sm font-medium text-[#717783] py-4 text-center">
                    Pilih tanggal yang tersedia untuk melihat jadwal.
                </div>
            )}

            {morningSlots.length > 0 && (
                <TimeSlotGroup
                    title="Sesi Pagi"
                    slots={morningSlots}
                    selectedSchedule={selectedSchedule}
                    onSelectSchedule={onSelectSchedule}
                />
            )}
            
            {afternoonSlots.length > 0 && (
                <TimeSlotGroup
                    title="Sesi Siang / Sore"
                    slots={afternoonSlots}
                    selectedSchedule={selectedSchedule}
                    onSelectSchedule={onSelectSchedule}
                />
            )}
        </section>
    );
}

function TimeSlotGroup`
);

// Update TimeSlotGroup signature and logic
code = code.replace(
    /function TimeSlotGroup\(\{\n    title,\n    slots,\n    selectedTime,\n    onSelectTime,\n\}: \{\n    title: string;\n    slots: Array<\{ time: string; label: string; disabled: boolean \}>;\n    selectedTime: string;\n    onSelectTime: \(time: string\) => void;\n\}\) \{[\s\S]*?\n\}/m,
    `function TimeSlotGroup({
    title,
    slots,
    selectedSchedule,
    onSelectSchedule,
}: {
    title: string;
    slots: Schedule[];
    selectedSchedule: Schedule | null;
    onSelectSchedule: (schedule: Schedule) => void;
}) {
    return (
        <div className="mb-6 last:mb-0">
            <h3 className="m-0 mb-4 text-[13px] font-bold tracking-widest text-[#a0a5b1] uppercase">
                {title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {slots.map((slot) => {
                    const isSelected = selectedSchedule?.id === slot.id;
                    return (
                        <button
                            key={slot.id}
                            type="button"
                            onClick={() => onSelectSchedule(slot)}
                            className={\`flex h-[42px] cursor-pointer items-center justify-center rounded-xl border-none text-[15px] font-bold transition-all \${
                                isSelected
                                    ? 'bg-[#eef5fe] text-[#1464BC] ring-2 ring-[#1464BC]'
                                    : 'bg-[#f7f9fb] text-[#414751] hover:bg-[#e2e4e6] hover:text-[#191c1e]'
                            }\`}
                        >
                            {slot.start_time.substring(0, 5)} WIB
                        </button>
                    );
                })}
            </div>
        </div>
    );
}`
);

fs.writeFileSync('resources/js/pages/therapists.tsx', code);
console.log('Update finished');

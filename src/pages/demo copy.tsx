import React from 'react';
import dayjs from 'dayjs';
import { Star } from 'lucide-react';

const startDate = '2024-08-14';
const endDate = '2024-09-10';
const start = dayjs(startDate);
const end = dayjs(endDate);
const totalDays = end.diff(start, 'day');

const MARGIN = 80;

const timelineData = [
    { date: "2024-08-01", description: "事件A", milestone: true },
    { date: "2024-08-28", description: "事件B", milestone: false },
    { date: "2024-09-15", description: "事件C", milestone: false },
    { date: "2024-09-25", description: "事件D", milestone: true },
    { date: "2024-09-30", description: "事件E", milestone: false },
];

const Timeline = () => {
    const numRows = 3;

    const calculateLeftPosition = (date) => {
        const current = dayjs(date);
        const daysFromStart = current.diff(start, 'day');
        const position = (daysFromStart / totalDays) * 100;
        return `${Math.max(position, MARGIN / (100 / totalDays))}%`;
    };
    const today = dayjs(); // Get current date
    const todayPosition = calculateLeftPosition(today);
    return (
        <div className="space-y-10">
            {[...Array(numRows)].map((_, rowIndex) => (
                <div key={rowIndex} className="relative flex items-center">
                    <div className="absolute w-full border-t-4 border-gray-500"></div>
                 
                    <div className="flex"> <div className="relative flex flex-col items-center" style={{ left: calculateLeftPosition(today), top: '50%' }}>
                            <div className="absolute w-1 h-full bg-red-500"></div>
                 
                        </div>
                        {timelineData.map((item, index) => (
                           
                            <div key={index} className="relative flex flex-col items-center" style={{ left: calculateLeftPosition(item.date), top: '50%' }}>
                                <div className="mb-2 text-xs text-gray-700">{item.date}</div>
                                <div className="relative w-2 h-4 bg-blue-500"></div>
                                {item.milestone && <Star className="w-3 h-3 text-red-500 absolute top-4 right-3" />}
                                <div className="mt-2 text-xs text-gray-700">{item.description}</div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Timeline;
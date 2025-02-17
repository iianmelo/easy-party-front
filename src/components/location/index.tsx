import React from 'react';
import { MapPin } from 'lucide-react';

interface TopBarProps {
    location: string;
}

const TopBar: React.FC<TopBarProps> = ({ location }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex justify-between"> 
                <p className='font-medium text-lg leading-6'>{location}</p>
            </div>
            <MapPin className='h-8 w-8'></MapPin>
        </div>
    );
};

export default TopBar;

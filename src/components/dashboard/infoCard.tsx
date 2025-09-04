import React, { FC } from 'react';
import { IconType } from 'react-icons/lib';

type Iprops = {
  label?: string;
  Icon: IconType;
  value: string;
};

const InfoCard: FC<Iprops> = ({ Icon, label, value }) => {
  return (
    <div className="rounded-lg p-4 border-1 flex gap-4 ">
      <Icon className="h-14 w-14 text-sidebar-accent-foreground flex gap-4 items-center" />
      <div>
        <h4 className="font-bold text-sm text-sidebar-accent-foreground">
          {label}
        </h4>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;

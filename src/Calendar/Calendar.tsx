import { default as dayjs } from "dayjs";
import { useEffect, useState } from "react";

import ScrollMenu from "react-horizontal-scroll-menu";

type Select = string | number | null;

const Calendar = () => {
  const [daysOfweek, setDaysOfWeek] = useState<dayjs.Dayjs[]>([]);
  const [selected, setSelected] = useState<Select>();
  const [customFormat, setCustomFormat] = useState<string>("ddd");
  const currentDay = dayjs().format("D");

  const getCurrentWeekDays = () => {
    const weekStart = dayjs().startOf("week");

    const days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(dayjs(weekStart).add(i, "days"));
    }

    return days;
  };

  useEffect(() => {
    setDaysOfWeek(getCurrentWeekDays());
  }, []);

  const MenuItem = ({ title, text, selected, key }: any) => {
    return (
      <div
        className={`menu-item dayItem ${selected ? "active" : ""} ${
          currentDay === text ? "today" : null
        }`}
        key={key}
      >
        <h5 className="title">{title}</h5>
        <span className="text"> {text}</span>
      </div>
    );
  };

  const Menu = (selected: any) =>
    daysOfweek.map((day: any) => {
      return (
        <MenuItem
          title={day.format(customFormat)}
          text={day.format("D")}
          key={day.format("D")}
          selected={selected}
        />
      );
    });

  const Arrow = ({ text, className }: any) => {
    return (
      <div className="buttonContainer">
        <div className={className}>{text}</div>
      </div>
    );
  };

  const ArrowLeft = Arrow({ text: "<", className: "button" });
  const ArrowRight = Arrow({ text: ">", className: "button" });

  const onSelect = (key: Select) => {
    if (key === selected) {
      setSelected(0);
    } else {
      setSelected(key);
    }
  };

  const menu = Menu(selected);

  const selectFormat = (e: React.FormEvent<HTMLSelectElement>) => {
    const option = e.currentTarget.value;

    switch (option) {
      case "Su-Sa":
        setCustomFormat("dd");
        break;
      case "Sun-Sat":
        setCustomFormat("ddd");
        break;
      case "Sunday-Saturday":
        setCustomFormat("dddd");
        break;
      default:
        setCustomFormat("ddd");
        break;
    }
  };

  return (
    <>
      <h4 className="mt-5 ml-10"> Change Day format </h4>
      <select
        name="customDay"
        className="mt-1 ml-10 "
        onChange={(e) => selectFormat(e)}
        defaultValue="Sun-Sat"
      >
        <option value="Su-Sa">Su-Sa</option>
        <option value="Sun-Sat">Sun-Sat</option>
        <option value="Sunday-Saturday">Sunday-Saturday</option>
      </select>
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected as string}
        onSelect={onSelect}
        scrollToSelected={true}
      />
    </>
  );
};

export default Calendar;

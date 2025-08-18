"use client";
import { Button } from "antd";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

export default function Home() {
  const [sds, setSds] = useState("Hello");

  useEffect(() => {
    console.log(sds);
  }, [sds]);

  return (
    <div className="w-2/3 bg-amber-100 p-4 pt-2 text-red-300">
      <RangePicker />
      <Button variant="solid" color="primary">
        Tes aja
      </Button>
    </div>
  );
}

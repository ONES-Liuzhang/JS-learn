import Trigger from "rc-trigger";

export default function RcTrigger() {
  return (
    <Trigger
      action={["click", "hover"]}
      popup={<span>popup</span>}
      popupAlign={{
        points: ["tl", "bl"],
        offset: [0, 10],
      }}
    >
      <a href="#a">hover</a>
    </Trigger>
  );
}

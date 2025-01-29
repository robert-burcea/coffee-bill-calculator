interface MenuBarProps {
  location: "cantina" | "viva";
}

export const MenuBar = ({ location }: MenuBarProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{location.toUpperCase()}</h1>
    </div>
  );
};
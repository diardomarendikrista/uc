import Navbar from "components/organisms/Navbar";

export default function Layout({ backTo = "/", title = "UC app", children }) {
  return (
    <div className="w-full relative">
      <Navbar
        title={title}
        backTo={backTo}
      />
      <div className="mt-15 md:mt-15">{children}</div>
    </div>
  );
}

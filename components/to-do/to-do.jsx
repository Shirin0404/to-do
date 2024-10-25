import bg from "@/public/img/bg.jpg";
import InputForm from "./input-form";

function ToDo() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="lg:h-screen "
    >
      <div className="flex justify-center items-center pt-20">
        <InputForm />
      </div>
    </div>
  );
}

export default ToDo;

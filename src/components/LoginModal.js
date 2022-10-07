import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";

function LoginModal({ open, close, content, title }) {
  const { login } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [open]);

  const handleChangeInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await login(input);
    } catch (err) {
      console.log(err);
    } finally {
      setInput("");
      close();
    }
  };

  return (
    <>
      {open && (
        <form
          className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50"
          onClick={close}
          onSubmit={handleSubmitForm}
        >
          <div className="flex justify-center items-center h-full">
            <div
              className="bg-white pb-8 w-1/3 text-end px-3 text-xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="" onClick={close}>
                x
              </button>
              <div className="flex justify-center pb-8">
                <p className="font-serif font-semibold">LOGIN</p>
              </div>
              <div className="grid grid-rows-2 justify-center gap-8">
                <div className="flex gap-20">
                  <input
                    name="email"
                    type="text"
                    placeholder="EMAIL"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={input.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="flex gap-10">
                  <input
                    name="password"
                    type="password"
                    placeholder="PASSWORD"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={input.password}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center">{title}</div>
            <div>{content}</div>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginModal;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import LotCreateToggle from "../features/lots/LotCreateToggle";

function ListingItem({ item, deleteItem, update, hide = false }) {
  const { admin } = useAuth();
  const [open, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    id: item.id,
    name: "",
    description: "",
    status: "",
  });
  // const {
  //   admin: { id },
  // } = useAuth();

  // const createItem = async (input) => {
  //   try {
  //     const res = await itemService.createItem();
  //     setItem(res.data.item);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleSubmitEdit = () => {
    try {
      update(input);
      setEdit(false);
      setInput({
        id: item.id,
        name: "",
        description: "",
        status: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[250px] bg-white rounded-lg border border-gray-200 shadow-md font-bebas">
      {admin && !hide && (
        <div className="flex justify-between">
          <button onClick={() => deleteItem(item.id)}>X</button>
          <>
            <button className="pr-4" onClick={handleSubmitEdit}>
              Submit Edit
            </button>
            <button onClick={() => setEdit((prev) => !prev)}>Edit</button>
          </>
        </div>
      )}
      <Link>
        <img className="rounded-t-lg" src={item.picture} alt="" />
      </Link>
      <div className="p-5">
        {edit ? (
          <input
            type="text"
            className="border-2 border-blue-500"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            placeholder="Edit Name"
          />
        ) : (
          <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {item.name}
          </div>
        )}
        {edit ? (
          <input
            type="text"
            className="border-2 border-blue-500"
            value={input.status}
            onChange={(e) => setInput({ ...input, status: e.target.value })}
            placeholder="Edit Status"
          />
        ) : (
          <div
            className={`mb-2 text-2xl uppercase font-bold tracking-tight ${
              item.status === "sold"
                ? " text-red-500 "
                : item.status === "available"
                ? " text-green-500 "
                : "text-yellow-500"
            }`}
          >
            {item.status}
          </div>
        )}
        {edit ? (
          <input
            type="text"
            className="border-2 border-blue-500"
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            placeholder="Edit Description"
          />
        ) : (
          <div className="mb-2 text-2xl tracking-tight text-gray-400">
            {item.description}
          </div>
        )}
        <Link className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          View Details
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
        {admin && (
          <div className="pt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={() => setIsOpen(true)}
            >
              Create Lot
            </button>
            <LotCreateToggle
              open={open}
              close={() => setIsOpen(false)}
              item={item}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingItem;

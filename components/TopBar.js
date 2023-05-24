import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TopBar({ categories, state, setState, main }) {
  const [add, setAdd] = useState(true);

  const [name, setName] = useState();

  return (
    // Remove the scroll bar from the top bar
    <div>
      <div
        className="p-2 py-3 overflow-auto flex items-center gap-2 w-full fixed top-0 bg-white z-10
          shadow-md
          backdrop-filter
          backdrop-blur-lg
          bg-opacity-50
      "
      >
        {categories?.map((category, i) => {
          const selected = state === category.name;
          return (
            <a key={i} href={`#${category.name}`}>
              <div
                className={`whitespace-nowrap shadow-md py-1 px-4 rounded-full text-sm cursor-pointer flex items-center gap-2 bg-white
              backdrop-filter
          backdrop-blur-lg
          bg-opacity-60 ${selected && "scale-125 mx-4"}
                    `}
                style={{ color: category.topTitle }}
              >
                <div onClick={() => setState(category.name)}>
                  {category.name}
                </div>
                {!main && (
                  <div
                    className={`text-2xl text-red-500 cursor-point `}
                    onClick={() => alert("delete category")}
                  >
                    <FiTrash2 />
                  </div>
                )}
              </div>
            </a>
          );
        })}
        {!main && (
          <div
            className={`whitespace-nowrap shadow-md py-1 px-4 rounded-full text-sm cursor-pointer flex items-center gap-2 ${
              state === "add" && "text-2xl"
            } `}
          >
            {add ? (
              <div onClick={() => setAdd(false)}>+</div>
            ) : (
              <div>
                <input onChange={(e) => setName(e.target.value)} />
                <span
                  className={`text-2xl text-green-500 cursor-pointer`}
                  //   onClick={() =>
                  //     axios
                  //       .post(
                  //         "/api/categories",
                  //         { name },
                  //         { "content-type": "application/json" }
                  //       )
                  //       .then((res) => {
                  //         if (res.data === "done") {
                  //           setName();
                  //           setAdd(true);
                  //         }
                  //       })
                  //   }
                >
                  add
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

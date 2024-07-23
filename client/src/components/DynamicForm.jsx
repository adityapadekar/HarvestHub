// // DynamicForm.jsx
// import React from "react";
// import PropTypes from "prop-types";

// DynamicForm.propTypes = {
//     Fields: PropTypes.array,
//     SetFields: PropTypes.func,
//     SubmitFunction: PropTypes.func,
// };

// export default function DynamicForm({ Fields, SetFields, SubmitFunction }) {
//     const handleChange = (e) => {
//         console.log("fields",Fields);
//         const { name, type } = e.target;

//         if (type === "file") {
//             const { files } = e.target;
//             SetFields((prevFields) => prevFields.map((field) => (field.name === name ? { ...field, value: files[0] } : field)));
//         } else if (type === "text") {
//             const { value } = e.target;
//             SetFields((prevFields) => prevFields.map((field) => (field.name === name ? { ...field, value } : field)), () => {
//                 console.log("Updated State:", Fields);
//             });

//         };
//     };

//     const handelSubmit =(e) => {
//         e.preventDefault();

//         SubmitFunction();
//     };

//     return (
//         <form action="" onSubmit={handelSubmit}
//             className="w-full h-full flex items-center justify-center">
//             { Array.isArray(Fields) && Fields?.map((field) => (
//                 <div key={field.id}>
//                     {field.type === "input-text" && (
//                         <input
//                             type="text"
//                             name={field.name}
//                             value={field.value  || ""}
//                             onChange={handleChange}
//                         />
//                     )}

//                     {field.type === "input-file" && (
//                         <input type="file" name={field.name} onChange={handleChange} />
//                     )}
//                 </div>
//             ))}

//             {/* buttons */}
//             <div>
//                 <button type="submit">Submit</button>
//             </div>
//         </form>
//     );
// }

import React, { useEffect } from "react";
import PropTypes from "prop-types";

DynamicForm.propTypes = {
    Fields: PropTypes.array,
    SetFields: PropTypes.func,
    SubmitFunction: PropTypes.func,
};

export default function DynamicForm({ Fields, SetFields, SubmitFunction }) {
    useEffect(() => {
        console.log("Updated State:", Fields);
    }, [Fields]);

    const handleChange = (e) => {
        const { name, type } = e.target;

        if (type === "file") {
            const { files } = e.target;
            SetFields((prevFields) =>
                prevFields.map((field) =>
                    field.name === name ? { ...field, value: files[0] } : field
                )
            );
        } else if (type === "text") {
            const { value } = e.target;
            SetFields((prevFields) =>
                prevFields.map((field) =>
                    field.name === name ? { ...field, value } : field
                )
            );
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        SubmitFunction();
    };

    return (
        <form
            action=""
            onSubmit={handelSubmit}
            className="w-full h-full flex items-center justify-center"
        >
            {Array.isArray(Fields) &&
                Fields?.map((field) => (
                    <div key={field.id}>
                        {field.type === "input-text" && (
                            <input
                                type="text"
                                name={field.name}
                                value={field.value || ""}
                                onChange={handleChange}
                            />
                        )}

                        {field.type === "input-file" && (
                            <input
                                type="file"
                                name={field.name}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}

            {/* buttons */}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

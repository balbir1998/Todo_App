import { createPortal } from "react-dom";

const Model = ({ }) => {
    return (
        createPortal(
            <div className="fixed inset-0 bg-gray-800/60">
                model
            </div>
            , document.getElementById("root"))
    )
}

export default Model
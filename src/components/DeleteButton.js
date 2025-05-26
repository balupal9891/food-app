import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {

    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed flex top-0 left-0 inset-0  items-center justify-center bg-black/70">
                <div className="p-4 rounded-lg bg-white">
                    <div>Are you sure, you want to delete</div>
                    <div className="flex gap-2">
                        <button type="button"
                            className="border-[2px]  "
                            onClick={() => setShowConfirm(false)}
                        >Cancel</button>
                        <button type="button" className="bg-red-600"
                            onClick={() => { onDelete() }}
                        >Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type='button' onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}
import { useState } from "react";
import Contact from "./Contact"

const Contacts = ({ contacts}) => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center bg-customBlack">
                    <div className="loading loading-dots loading-lg"></div>
                </div>
            ) : (
                <div>
                    {contacts.map((contact) => (
                        <Contact key={contact._id} contact={contact} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Contacts
const ErrorMessage = ({ message }) => {

    if (!message) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm">
            {message}
        </div>
    );
};

export default ErrorMessage;
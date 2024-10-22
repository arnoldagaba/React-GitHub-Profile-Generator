import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import dark_logo from "../assets/icons8-github.svg";
import light_logo from "../assets/icons8-github (1).svg";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
	const { theme } = useContext(ThemeContext);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.trim()) {
			navigate(`/profile/${username}`);
		}
	};

	return (
		<div className="home flex justify-center items-center h-[81vh] bg-slate-200 dark:bg-slate-900">
			<form
				onSubmit={handleSubmit}
				className="max-w-[35vw] bg-gray-100 p-6 shadow-lg rounded-md backdrop-blur-3xl dark:bg-gray-800"
			>
				<h1 className="text-gray-800 text-2xl font-bold mb-4 text-center dark:text-slate-200">
					GitHub Profile Search
				</h1>

				<div className="flex flex-col items-center justify-center">
					{theme === "light" ? (
						<img src={dark_logo} alt="" width={50} color="white" />
					) : (
						<img src={light_logo} alt="" width={50} color="white" />
					)}
					<p className="text-black text-center text-sm dark:text-white py-4">
						Welcome to GitHub Profile Generator! Enter a GitHub username to
						instantly view and explore all key details about the user in a
						stylish and organized layout. Simply type in the username and hit
						search to get started!
					</p>
				</div>

				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Enter GitHub username"
					className="text-white border-gray-300 py-2 px-4 rounded-md w-full mb-4 outline-0 border-0 placeholder:text-black dark:bg-slate-500 dark:placeholder:text-white"
				/>
				<button
					type="submit"
					className="bg-blue-500 dark:bg-black text-white px-4 py-2 rounded-md w-full"
				>
					Search
				</button>
			</form>
		</div>
	);
};

export default Home;

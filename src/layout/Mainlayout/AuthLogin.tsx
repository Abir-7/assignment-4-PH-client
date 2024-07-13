import AuthOption from "./AuthOption";
import { LoginButton } from "./NavBar";

const AuthLogin = ({ user }: { user: boolean }) => {
  return (
    <div>
      {" "}
      {user ? (
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-green-600">
          <AuthOption></AuthOption>
        </div>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
};

export default AuthLogin;

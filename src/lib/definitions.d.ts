type User = {
    id: number;
    email: string;
    password: string;
};

type MobilePropTypes = {
    isSigningOut: boolean,
    handleSignOut: () => void,
}

interface MTypes extends MobilePropTypes {
    isClicked: boolean,
    setClicked:React.Dispatch<React.SetStateAction<boolean>>
}

export { User, MobilePropTypes, MTypes };

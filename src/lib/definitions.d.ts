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

interface MOptionsTypes extends MobilePropTypes {
    isClicked: boolean,
    handleClick: () => void
}

export { User, MobilePropTypes, MTypes, MOptionsTypes };

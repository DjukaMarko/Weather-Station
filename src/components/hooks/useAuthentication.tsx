'use client'
import { SyntheticEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface HookReturnValue {
    handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
    errorMessage: string | undefined;
    isLoading: boolean;
  }

const useAuthentication = (callback: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>): HookReturnValue => {
    const [errorMessage, dispatch] = useFormState(callback, undefined);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      errorMessage && setLoading(false);
    }, [errorMessage]);
  
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      dispatch(formData);
    };
  
    return { handleSubmit, errorMessage, isLoading } as HookReturnValue;
  };
  
  export default useAuthentication;
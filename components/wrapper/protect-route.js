import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthnticated } from "../../redux/store/auth-slice";
import { useEffect } from "react";
import { useRouter } from 'next/router'

function PrivatePage(props) {
    const isAuthnticated = useSelector(selectIsAuthnticated);
    const router = useRouter();
    let content;
    useEffect(() => {
        if (!isAuthnticated) { router.push("/auth/login"); }
    });
    if (!isAuthnticated) {
        content = <div>
            <h1>Redirecting...</h1>
        </div>;

    } else {
        content = props.children;
    }



    return <Fragment>{content}</Fragment>;
}

export default PrivatePage;

import React from "react";
import PageTemplate from "../components/templateTVShowPage";
import ReviewForm from "../components/reviewFormTVShow";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import {  getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TVShowT } from "../types/interfaces";

const WriteReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvShowId } = location.state;
    const { data: tvShow, error, isLoading, isError } = useQuery<TVShowT, Error>(
        ["movie", tvShowId],
        () => getTVShow(tvShowId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tvShow ? (
                    <PageTemplate tvShow={tvShow}>
                        <ReviewForm {...tvShow} />
                    </PageTemplate>
            ) : (
                <p>Waiting for tv show review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;
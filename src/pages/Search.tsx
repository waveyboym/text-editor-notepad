import React, { FunctionComponent } from 'react';

type SearchProps = {
    apptheme: Boolean,
    notescolours: String[],
    searchq: String
}

export const Search : FunctionComponent<SearchProps> = ({apptheme, notescolours, searchq}) => {
    return (
        <div>Search</div>
    )
}
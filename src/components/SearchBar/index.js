import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

// Image
import searchIcon from '../../images/search-icon.svg';

// style
import { Wrapper, Content } from "./SearchBar.style";

const SearchBar = ({setSearchTerm}) => {

    const [State, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {

        if (initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(State);
        }, 500)

        return () => clearTimeout(timer);
    }, [setSearchTerm, State])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input 
                type='text' 
                placeholder='Search Movie' 
                onChange={event => setState(event.currentTarget.value)}
                value={State}
                />
            </Content>
        </Wrapper>
    )
}

SearchBar.propTypes = {callback: PropTypes.func};

export default SearchBar;
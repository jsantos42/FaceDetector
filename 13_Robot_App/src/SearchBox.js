const SearchBox = ({filterOnSearch}) => {
    return (
        <div className='pa2'>
            <input
                type='search'
                placeholder='search robots'
                className='pa3 ba b--green bg-lightest-blue'
                onChange={filterOnSearch}
            />
        </div>
    );
}
export default SearchBox;
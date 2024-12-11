import "./index.css"
const SearchBar = (props) =>{
    const {appliances} = props;
    return(
        <>
            <input type="text" className="search-input" placeholder="Search Home Appliances" value={props.value} onChange={(e) => props.onChangeSearchInput(e.target.value)} />
            {
                props.value!=="" &&
                    (
                        <ul className="suggestions-list">
                            {appliances.map(a=><li key={a.appliance_id}>{a.type_name}</li>)}
                        </ul>
                    )
            }
        </>
    )
} 
export default SearchBar;


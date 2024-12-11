import "./index.css"
const LocationDropdown = (props) => {
    const {onChangeLocation,locations} = props;
    return(
        <select className="location-dropdown" onChange={e=>onChangeLocation(e.target.value)}>
            {locations.map(o=><option key={o.id} value={o.id}>{o.displayText}</option>)}
        </select>
    )
}

export default LocationDropdown
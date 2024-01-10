import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus, faMinus, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

    const SaveButton = <FontAwesomeIcon icon={faSave} type={`Button`} />;
    const AddButton = <FontAwesomeIcon icon={faPlus} type={`Button`} />;
    const RemoveButton = <FontAwesomeIcon icon={faMinus} type={`Button`} />;
    const UpButton = <FontAwesomeIcon icon={faArrowUp} type={`Button`} />;
    const DownButton = <FontAwesomeIcon icon={faArrowDown} type={`Button`} />;


export {SaveButton, AddButton, RemoveButton, UpButton, DownButton};
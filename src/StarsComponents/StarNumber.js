import { colors } from './colors'
export const StarNumber = (props) => {
    return (
        <button className="star-number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.status, props.numberId1)}>
            {props.numberId1}
        </button>
    );

}
import { utils } from '../math-utils';
import { starColors} from './StarColors'

export const StarsDisplay = (props) => (
    <>
        { 
          utils.range(1, props.count).map(starId =>
               <div key={starId} className="star" style={{ color: starColors[props.starColor] }} ></div>
             )
        }
    </>
);


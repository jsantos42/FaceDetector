import Card from "./Card";
import tachyons from 'tachyons'

const CardList = ({ robots }) => {
    const CardArray = robots.map(i =>
            <Card
                key={i.id}
                id={i.id}
                name={i.name}
                username={i.username}
                email={i.email}
                />)
    return (
        <>{CardArray}</>
    );
}

// const CardList = ({ robots }) => {
//     return (
//         <div> {
//             robots.map(i =>
//                 <Card
//                     key={i.id}
//                     id={i.id}
//                     name={i.name}
//                     username={i.username}
//                     email={i.email}
//                 />)
//         }</div>
//     );
// }

export default CardList;
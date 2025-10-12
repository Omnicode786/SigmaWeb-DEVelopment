import styles from './Header.module.css'


function Header(){

    return (
<>
<div className={styles.header}>
<div className={styles.part1}>
    <h1>Muzammil Alam</h1>
</div>

    <ul className={styles.part2}>
        <li>Home</li>
        <li>About us</li>
        <li>Services</li>
        <li>Contacts</li>
    </ul>

</div>



</>

    )



}

export default Header
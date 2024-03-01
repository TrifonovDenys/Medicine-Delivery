import { Container, Title, StyledImage } from './FirstPage.styled';
import example from '../../assets/example.png';
import { useEffect, useState } from 'react';

const FirstPage = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.open-notify.org/astros.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData(); // Вызываем функцию fetchData при монтировании компонента

    // Пустой массив зависимостей означает, что эффект будет запущен только один раз после монтирования компонента
  }, []);


  return (
    <Container>
      {data ? (
        <>
          <Title>People in Space:</Title>
          <ul>
            {data.people.map((person, index) => (

              person.craft == "ISS" ? <li key={index}>{person.name}</li> : null
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <StyledImage src={example} alt="Example" />
    </Container>
  );
};

export default FirstPage;

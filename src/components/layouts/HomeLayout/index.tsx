import PokemonCard from '../../molecules/PokemonCard';

const HomeLayout = (): JSX.Element => {
  return (
    <>
      <header>
        <h1>UmbraDex</h1>
      </header>
      <main>
        <PokemonCard
          id={1}
          name="bulbassaur"
          type="grass"
          imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        />
      </main>
    </>
  );
};

export default HomeLayout;

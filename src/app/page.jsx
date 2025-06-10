import Link from "next/link";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default async function Home({ searchParams }) {
  const searchedParams = await searchParams;
  const page = searchedParams.page || 1;

  if (isNaN(page) || page < 1) {
    return (
      <div>
        <h1>Invalid page number</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  console.log("Current page:", page);

  return (
    <div >
      <Featured />
      <CategoryList />
      <div >
        <CardList page={parseInt(page)}/>
        <Menu />
      </div>
    </div>
  );
}
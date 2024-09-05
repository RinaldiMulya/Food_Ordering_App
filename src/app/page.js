import Image from 'next/image'
import Hero from '../components/layout/hero'
import Menu from '../components/layout/Homemenu'
import SectionHeader from '../components/layout/SectionHeader'




export default function Home() {
  return (
    <>
      <Hero/>
      <Menu/>

      <section className="text-center my-16">
        <SectionHeader
          subHeader={'Our Story'}
          mainHeader={'About Us'}
        />

        <div className="text-gray-500">
          <p className="max-w-2xl mx-auto mt-4">
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    </>
  );
}
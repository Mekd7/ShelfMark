import Navigation from "@/components/navigation";


export default function AppLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode;
}) {
  return (

    <>
    <Navigation/>
    {children}
    {modal} {/**when a user try to navigate to some route, first it is going to be
     * rendred to fill the children slot but first it's exsistence in the modal folder must
     * be checked, if it exists instead of null, it will be rendered on top of the children layout
     */}
    
    </>
        
  );
}

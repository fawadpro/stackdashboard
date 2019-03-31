import styled from 'styled-components';

// App Colors
let color_text_headerComponent = '#4a4a4a';
let color_background_dashboard = '#ffffff';
let color_sub_headerComponent = '#9b9b9b';
let color_text_logo = '#3cbfc8';
let color_background_menu = '#fff';
let color_boxShadow_dashboard= '0 2px 20px 0 rgba(185, 188, 210, 0.2)';
let color_background_mainContainer= '#f8f8f8';




// Top Header Component Main Style
export const HeaderContainer= styled.div `
    margin-top: 67px;
    margin-left: 220px;
    margin-bottom: 30px;
`

// Top Header Component Text Style
export const TopHeaderText = styled.h2 `
    text-transform: capitalize;
    font-weight: 400;
    color: ${color_text_headerComponent};
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 0.8rem;
`

// Component : Top Sub Header Style
export const SubHeader =styled.div `
    text-transform: capitalize;
    margin-bottom: 1rem;
    color: ${color_sub_headerComponent} !important;
`
// Component : Top Sub Header Text Style
export const SubHeaderText= styled.div `
    font-size: 10px;
`

/* ==========================
    Component Header Style End
   ==========================
*/




// Top Menu Styles
export const TopMenuStyle = {
    MenuWrapper : {
        top: '0',
        position: 'fixed',
        width: '100%',
        zIndex: '100',
        backgroundColor: color_background_menu,
        marginBottom: '0 !important '},
        MenuSpaceBetween : {
        width: '200px',
        display: 'flex',
        justifyContent: 'center'
        },
        MenuLogo : {
            color: color_text_logo,
            fontWeight: '600'
        }
}

/* ==========================
    Top Menue Style End
   ==========================
*/


// Left Menue Styles
export const LeftMenuStyle= styled.div `
.left-menus {
    position: fixed;
    width: 200px;
    padding-right: 0 !important;
    background-color: #fff;
    height: 100%;
    margin-top: 20px;
    top: 47px;
    font-size: 12px !important;
    border-right: 2px solid #e8e8ec;

  }
    .left-menus .menu {
      color: #4a4a4a;
      width: 100%;
      display: block;
      cursor: pointer;
      text-transform: capitalize !important;
      padding: 15px 10px 15px 18px; }

    .left-menus .menu.active {
      border-right: 4px solid #3cbfc8;
      background-color: #f8f8f8; }

`





// Pages styles

export const PageWrapperStyle = styled.div `
.ui.segment {
    border-radius: 2px;
    background-color: ${color_background_dashboard};
    box-shadow: ${color_boxShadow_dashboard};
    border: solid 1px #e8e8ec; }

`


/* ==========================
    Pages Style End
   ==========================
*/



// Main Container Component Styles

export const MainContainerStyle=styled.div`
.main-container {
    margin-top: 10px;
    width: 100%;
    padding: 0 20px 20px 220px !important;
    background-color: ${color_background_mainContainer} !important; }
`

/* ==========================
    Main Container Style End
   ==========================
*/



// Organization Form style start

export const TypesStyles = styled.div`
    display: flex;
    align-items: center;
    /* flex-wrap: nowrap; */
    /* justify-content: space-around; */
    label {
        color: rgba(0, 0, 0, 0.87);
        font-size: 0.92857143em;
        font-weight: 700;
        text-transform: none;
        min-width: 50px;
    }
    .required {
        color: #db2828;
    }
    .select-types {
        width: 100%;
    }
    .css-10nd86i {
        width: 100%;
    }
    .types-dropdown {
        width: 100%;
    }
`
export const Error = styled.small`
    color: red;
`
/* ==========================
    Organiztion Form Style End
   ==========================
*/

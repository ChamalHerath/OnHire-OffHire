/*
    ITEMS ON PAGE
    -------------
    Harrison Feldman    Dec 2019


    Shows the range of items on a given page of a table in reference to the total amount of items in the table.
    E.G Showing 7 - 14 of 38

    PROPS
    --------------
      rows - the data of the table
      currentPage - the current page of the table
      pageSize - the amount of items per page
 */

import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';


export class ItemsOnPage extends Component {


    render() {
        if (isMobile) { return (<div></div>); }

        //FirstItem = last item on previous page + 1 (if there are no items return 0)
        let firstItem = (this.props.currentPage - 1) * this.props.pageSize + (this.props.rows.length > 0 ? 1 : 0);

        var lastItem = 0;
        if (this.props.currentPage * this.props.pageSize > this.props.rows.length) {//If this is the last page
            //Last item is the last item of the data
            lastItem = this.props.rows.length;
        }
        else {
            lastItem = this.props.currentPage * this.props.pageSize
        }

        return (
            <article className="selfCenter" id="pageDetails">
                {this.props.rows.length === 0 &&
                    <p className="smallTxt selfCenter">
                        No Data Found
                    </p>
                }
                {this.props.rows.length !== 0 &&
                    <p className="smallTxt selfCenter">
                        Showing {firstItem} - {lastItem} of {this.props.rows.length}
                    </p>
                }
            </article>
        );


    }
}

export default ItemsOnPage;
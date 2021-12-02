const nickname = document.getElementsByName('nickname')[0].content.replaceAll("//s", " ");
const public_address = document.getElementsByName('public_address')[0].content;
const balance = parseFloat(document.getElementsByName('balance')[0].content).toFixed(2) / 10^9;

const App = () => {
    function getPortfolioTable() {
        return (
            <div className="portfolio_card">
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Address</th>
                            <th>VXCN Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: "170px" }}>{ nickname }</td>
                            <td style={{ width: "170px" }} id="tabledata-portfolio-address">
                                <a href="" target="_blank" id="anchor-portfolio-address"> </a>
                            </td>
                            <td style={{ width: "170px" }} id="tabledata-portfolio-eth-balance"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };

    return getPortfolioTable();
}

const domContainer = document.getElementById('container-portfolio-table');
ReactDOM.render(<App />, domContainer);


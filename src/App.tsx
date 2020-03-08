import React from "react";
import "./App.css";

// 型定義
type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
};

type DetailProps = {
  classification: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
};

type SummaryProps = {
  numOfPeople: number;
  totalAmount: number;
};

// コンポーネント定義
type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
};

const Detail: React.FC<DetailProps> = props => {
  const onNumOfpeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChange(num);
  };

  return (
    <div>
      <div className="classification-name">{props.classification.name}</div>
      <div className="description">{props.classification.description}</div>
      <div className="unit-price">{props.classification.unitPrice}円</div>
      <div className="num-people">
        <select
          value={props.classification.numOfPeople}
          onChange={e => onNumOfpeopleChange(e)}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>名</span>
      </div>
    </div>
  );
};

const Summary: React.FC<SummaryProps> = props => {
  return (
    <div>
      <div className="party">
        <input type="text" className="party" value={props.numOfPeople} />
        <span>名様</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input type="text" className="total-amount" value={props.totalAmount} />
        <span>円</span>
      </div>
    </div>
  );
};

class AdmissionFeeCalculator extends React.Component<
  {},
  AdmissionFeeCalculatorState
> {
  // コンストラクター
  constructor(props: {}) {
    super(props);
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0
    };

    const students: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0
    };

    const children: FeeClassification = {
      name: "子ども",
      description: "小校生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0
    };

    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0
    };

    // stateを設定
    this.state = { feeClassifications: [adults, students, children, infants] };
  }

  // 金額変更時に、stateを変更するメソッド
  handleNumOfPeopleChange(idx: number, num: number) {
    // 現在の料金クラスを格納
    const currentFC = this.state.feeClassifications[idx];
    // 変更後のトータル金額を計算
    const newTotalPrice = currentFC.unitPrice * num;
    // 変更後の料金クラスを格納(currentFCと新しいtotalPriceをもつオブジェクトをassignして作成)
    const newFC: FeeClassification = Object.assign({}, currentFC, {
      numOfPeople: num,
      totalPrice: newTotalPrice
    });
    // 引数なしのsleceを実行して、オブジェクトをコピー
    const feeClassifications = this.state.feeClassifications.slice();
    // 指定idの料金クラスを変更後の料金クラスに変更
    feeClassifications[idx] = newFC;
    // 変更した料金クラスリストでstateを更新
    this.setState({ feeClassifications: feeClassifications });
  }

  render() {
    // 自身のStateを子コンポーネントに付与(子で起こった変更を検知できる)
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail
          key={idx.toString()}
          classification={fc}
          onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)}
        />
      );
    });

    // 各料金クラスに格納された人数の合計を算出
    const numOfPeople = this.state.feeClassifications
      .map(fc => fc.numOfPeople)
      .reduce((p, c) => p + c);

    // 各料金クラスに格納された金額の合計を算出
    const totalAmount = this.state.feeClassifications
      .map(fc => fc.totalPrice)
      .reduce((p, c) => p + c);

    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
};

export default App;

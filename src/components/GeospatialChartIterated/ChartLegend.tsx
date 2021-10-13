import { Col, Row, Typography } from 'antd';

import { CSVRow } from '../../services/models/shared';
import { DSVParsedArray } from 'd3';
import { KeysMatching } from '../../types/shared';
import { currencyFormatter } from '../../util/currency';
import { useGeospatialChart } from './hooks/useGeospatialChart';

const { Text } = Typography;

export interface ChartLegendProps<T extends CSVRow> {
  timeField: KeysMatching<T, number | undefined>;
  stateField: KeysMatching<T, string | undefined>;
  colorRepresentation: KeysMatching<T, number | undefined>;
  chosenTimeField: number;
  rows: DSVParsedArray<CSVRow>;
}

export const ChartLegend = <T extends CSVRow>({
  timeField,
  stateField,
  colorRepresentation,
  chosenTimeField,
  rows,
}: ChartLegendProps<T>) => {
  const { colorExtent, colorSaturationScale } = useGeospatialChart(
    rows,
    timeField as string,
    stateField as string,
    colorRepresentation as string,
    chosenTimeField
  );

  const colors: string[] = [];
  const max = colorExtent?.max || 0;
  let min = colorExtent?.min || 0;

  const accumulator = (max - min) / 8;

  while (colors.length < 8) {
    colors.push(colorSaturationScale(min));
    min += accumulator;
  }

  // the 200 is some arbitrary number
  const width = 200 / colors.length;
  const cols = colors.map((color) => (
    <Col
      span={3}
      style={{ height: '25px', width, backgroundColor: color }}
      key={color}
    />
  ));

  return (
    <>
      <Row justify="end">{cols}</Row>
      <Row justify="space-between">
        <Text>{currencyFormatter.format(colorExtent?.min ?? 0)}</Text>
        <Text>{currencyFormatter.format(max)}</Text>
      </Row>
    </>
  );
};

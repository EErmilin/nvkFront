import React from "react"
import classes from "./Terms.module.scss";
import InfoPageUnit from "../../components/InfoPageUnit/InfoPageUnit";
import { getUpdateClient } from "../../requests/updateHeaders";
import { TERM } from '../../gql/query/Terms';

export const Terms = (props) => {

  const [data, setData] = React.useState(null);

  const update = React.useCallback(async () => {
    try {
      const client = await getUpdateClient();
      const response = await client.query({
        query: TERM,
        variables: {
          id: 1,
        },
      });
      setData(response.data.term);
    } catch { }
  }, []);

  React.useEffect(() => {
    update();
  }, [update]);


  if (!data) return null
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <InfoPageUnit title={data.name}>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </InfoPageUnit>
      </div>
    </div>
  )
}

export default Terms

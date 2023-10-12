import React, { useMemo } from "react"
import classes from "./ListBroadcasts.module.scss";
import { getBroadcasts } from "../../redux/thunks/screens/broadcasts/GetBroadcasts";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { BroadcastItem } from "./components/BroadcastItem/BroadcastItem";

export const ListBroadcasts = () => {

  const [search, setSearch] = React.useState('');

  const broadcastsRedux = useAppSelector(state => state.screens.broadcasts);
  const dispatcher = useDispatch()


  const update = React.useCallback(async () => {
    await dispatcher(getBroadcasts({ search: search }));
  }, [dispatcher, search]);

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);

  const templateBrodcasts = useMemo(() => {
    return broadcastsRedux.map((item, key) => <BroadcastItem brodcast={item} key={key} />)

  }, [broadcastsRedux])


  return (
    <div className={classes.wrapper}>
      {templateBrodcasts}

    </div>
  )
}

export default ListBroadcasts

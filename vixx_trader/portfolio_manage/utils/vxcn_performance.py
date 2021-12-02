import os

import pandas as pd

from django.conf import settings


def parse_vxcn_performance():
    file = os.path.join(settings.BASE_DIR, "portfolio_manage/data", "vixcoin_performance.csv")

    df = pd.read_csv(
        file,
        index_col="Date",
        parse_dates=True,
        infer_datetime_format=True
    )

    return df
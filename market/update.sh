#!/bin/bash
# Make conda commands available to sub terminals
source c:/Users/Ameno/Anaconda3/etc/profile.d/conda.sh
conda activate luna-market
gcloud builds submit --tag gcr.io/luna-8a91a/market
gcloud beta run deploy luna-market-run --image gcr.io/luna-8a91a/market --region=europe-west4
import React from 'react'
import axios from 'axios'
import FileSaver from 'file-saver'
import DataTable2 from '../UITools/Datatable2/DataTableComponent2'

export default class DefaultListComponent extends React.Component {

  constructor(props , dataUrl  ) {
      super(props)
      this.state = {
        searchOptions: null,
        page : 0 ,
        dataUrl : dataUrl
      }
    }

  fetchData = (  pageProps, searchOptions ) => {
      this.setState({ isLoading: true })
      axios.get( this.state.dataUrl ,
        {
          headers: { Accept: 'application/json' },
          params: { ...pageProps, ...searchOptions },
        })
        .then((response) => {
          if (response.status === 200 && response.data
            && response.data.content && response.data.content.length > 0) {
              this.setState({
                dataList : response.data.content,
                totalElements: response.data.totalElements,
                isLoading: false,
              })
              console.log(JSON.stringify(response.data));
              
        } else {
          this.setState({ dataList: [], totalElements: 0, isLoading: false })
        }
      })
      .catch((error) => {
         const { data } = error.response
         const errorKey = data && data.key ? data.key : 'generalErrorMessage'
         this.setState({ dataList: [] , totalElements: 0, isLoading: false, errorKey  })
      })
  }

    handleTableChange = (page, size, sortCol, sortDir) => {
      const pageProps = {
        page, size, sort: sortCol == '' ? 'id' : sortCol + ',' + sortDir,
      }

      const { searchOptions } = this.state
      this.fetchData(  pageProps, searchOptions)
    }

    viewLink = (id) => {
      this.setState({ goView: id })
    }

    comeback = () => { this.setState({ goView: null }) }


    downloadFile = ( printURL , fileName  ,  id) => {
      const mime = 'application/pdf'
      const headers = { Accept: mime }
      axios.get( printURL  + id, { headers, responseType: 'arraybuffer' })
        .then((res) => {
          let blob = new Blob([res.data], { type: mime })
          FileSaver.saveAs(blob, fileName  )
        }).catch((error) => {
          const { data } = error.response
          const errorKey = data && data.key ? data.key : 'generalErrorMessage'
          this.setState({ loaderOn: false, errorKey })
        })
    }

    updateSearchFields = (values) => {
      const pageProps = {
        page: 0,
        size: 10,
        sort: 'id,ASC',
      }
      this.setState({ page: 0, searchOptions: values })
      this.fetchData(pageProps, values)
    }


    drawDataTable = (columns) => {
        const { dataList , isLoading, totalElements } = this.state

      return (
        <DataTable2
          columns={columns}
          data={dataList}
          loading={isLoading}
          totalElements={totalElements}
          handleTableChange={this.handleTableChange}
          onPageChange={page => this.setState({ page })}
          page={this.state.page}
        />
      ) 
    }
}
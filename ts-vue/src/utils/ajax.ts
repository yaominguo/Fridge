export interface AjaxResponse {
  code: number;
  data: any;
  message: string;
  status: number;
}

export interface AjaxRequestConfig {
  url: string;
  methods: string;
  data: any;
}
